import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {OtherPlugins} from "../types/OtherPlugins";
import {OtherPlugin} from "../types/OtherPlugin";
import {__} from "@wordpress/i18n";
import React from "react";
import HttpClient from "../api/requests/HttpClient";

const useOtherPluginsData = () => {

    const pluginActionRoute = 'do_plugin_action';
    const otherPluginsDataRoute = 'other_plugins_data';
    const client = new HttpClient();

    // Query for fetching settings from server
    const {isLoading, error, data: response} = useQuery({
        queryKey: [otherPluginsDataRoute],
        queryFn: () => client.setRoute(otherPluginsDataRoute).get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: true,
    });

    const relatedReallySimplePlugins: OtherPlugins = response?.data?.plugins;

    if (error !== null) {
        console.error('Error fetching related plugins: ', error.message);
    }

    const queryClient = useQueryClient();
    const updatePluginData = (slug: string, newPluginItem: OtherPlugin) => {
        if (!relatedReallySimplePlugins) {
            return;
        }

        queryClient.setQueryData([otherPluginsDataRoute], (oldResponse: any) => {

            oldResponse.data.plugins = Object.fromEntries(
                Object.entries(oldResponse?.data?.plugins as Record<string, OtherPlugin>).map(
                    ([key, plugin]: [string, OtherPlugin]) =>
                        plugin.slug === slug ? [key, newPluginItem] : [key, plugin]
                )
            );

            return oldResponse;
        });
    };

    const getPluginData = (slug: string) => {
        if (!relatedReallySimplePlugins) {
            return;
        }
        return Object.values(relatedReallySimplePlugins).find((plugin: OtherPlugin) => plugin.slug === slug);
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
        mutationFn: async ({slug, action, e,}: {
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

            // let updatedPluginItem = await doPluginAction(slug, action);
            let updatedPluginItemResponse = await client.setRoute(pluginActionRoute).setPayload({
                'slug': slug,
                'action': action,
            }).post();

            let updatedPluginItem = updatedPluginItemResponse?.data?.plugin;
            if (!updatedPluginItem) {
                console.error('Error fetching updated plugin item: ', updatedPluginItemResponse?.message);
                return;
            }

            //if the plugin was downloaded, we now activate.
            if (updatedPluginItem.action === "activate") {
                pluginItem.action = "activating";
                updatePluginData(slug, pluginItem);
                // updatedPluginItem = await doPluginAction(slug, "activate");
                updatedPluginItemResponse = await client.setRoute(pluginActionRoute).setPayload({
                    'slug': slug,
                    'action': 'activate',
                }).post();

                updatedPluginItem = updatedPluginItemResponse?.data?.plugin;
                if (!updatedPluginItem) {
                    console.error('Error 2 fetching updated plugin item: ', updatedPluginItemResponse?.message);
                    return;
                }
            }
            updatePluginData(slug, updatedPluginItem);
        },
    });

    return {
        plugins: relatedReallySimplePlugins,
        fetched: !isLoading,
        pluginActionNice,
        runPluginAction: runPluginAction.mutate,
    };
};

export default useOtherPluginsData;