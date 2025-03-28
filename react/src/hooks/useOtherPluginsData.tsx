import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {OtherPlugins} from "../types/OtherPlugins";
import {OtherPlugin} from "../types/OtherPlugin";
import {__} from "@wordpress/i18n";
import doPluginAction from "../api/endpoints/Dashboard/doPluginAction";
import React from "react";
import HttpClient from "../api/requests/HttpClient";

const useOtherPluginsData = () => {

    const route = 'other_plugins_data';
    const client = new HttpClient(route);

    // Query for fetching settings from server
    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: true,
    });

    if (error !== null) {
        console.error('Error fetching related plugins: ', error.message);
    }

    const queryClient = useQueryClient();
    const updatePluginData = (slug: string, newPluginItem: OtherPlugin) => {
        if (!response) {
            return;
        }

        queryClient.setQueryData([route], (oldData: OtherPlugins) => {
            return oldData.map((plugin: OtherPlugin) =>
                plugin.slug === slug ? newPluginItem : plugin,
            );
        });
    };

    const getPluginData = (slug: string) => {
        if (!response) {
            return;
        }
        return response?.data?.plugins.find((plugin: OtherPlugin) => plugin.slug === slug);
    };

    const pluginActionNice = (action: string) => {
        const statuses: { [key: string]: string } = {
            installed: __("Installed", "simplybook"),
            download: __("Install", "simplybook"),
            activate: __("Activate", "simplybook"),
            activating: __("Activating...", "simplybook"),
            downloading: __("Downloading...", "simplybook"),
            "upgrade-to-premium": __("Upgrade", "simplybook"),
        };
        return statuses[action] || "";
    };

    const runPluginAction = useMutation({
        mutationFn: async ({
           slug,
           action,
           e,
       }: {
            slug: string;
            action: string;
            e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
        }) => {
            if (action === "installed" || action === "upgrade-to-premium") {
                return;
            }

            if (e) e.preventDefault();
            let data: any = {};
            data.slug = slug;
            data.action = action;
            let pluginItem = getPluginData(slug);
            if (!pluginItem) return;

            if (action === "download") {
                pluginItem.action = "downloading";
            } else if (action === "activate") {
                pluginItem.action = "activating";
            }
            updatePluginData(slug, pluginItem);

            if (action === "installed" || action === "upgrade-to-premium") {
                return;
            }

            let updatedPluginItem = await doPluginAction(slug, action);
            console.log("resulting plugin item", updatedPluginItem);
            //if the plugin was downloaded, we now activate.
            if (updatedPluginItem.action === "activate") {
                pluginItem.action = "activating";
                updatePluginData(slug, pluginItem);
                updatedPluginItem = await doPluginAction(slug, "activate");
            }
            updatePluginData(slug, updatedPluginItem);
        },
    });

    return {
        plugins: response?.data?.plugins,
        fetched: !isLoading,
        pluginActionNice,
        runPluginAction: runPluginAction.mutate,
    };
};

export default useOtherPluginsData;