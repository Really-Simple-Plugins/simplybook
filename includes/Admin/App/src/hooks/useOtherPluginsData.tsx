import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import getOtherPlugins from "../api/endpoints/Dashboard/getOtherPlugins";
import {OtherPlugins} from "../types/OtherPlugins";
import {OtherPlugin} from "../types/OtherPlugin";
import {__} from "@wordpress/i18n";
import doPluginAction from "../api/endpoints/Dashboard/doPluginAction";
import React from "react";
const useOtherPluginsData = () => {
    const query = useQuery<OtherPlugins>({
        queryKey: ["other_plugins"],
        queryFn: async () => {
            const response = await getOtherPlugins();
            console.log("other plugins response", response);
            return response;
        },
        placeholderData: [
            {
                url: "#",
                title: "...",
                action: "...",
                actionNiceName: "...",
                slug: "...",
                color: "black",
            },
        ],
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: true,
    });

    const queryClient = useQueryClient();
    const updatePluginData = (slug: string, newPluginItem: OtherPlugin) => {
        if ( !query.data ){
            return;
        }

        queryClient.setQueryData(["other_plugins"], (oldData : OtherPlugins ) => {
            return oldData.map((plugin: OtherPlugin) =>
                plugin.slug === slug ? newPluginItem : plugin
            );
        });
    };

    const getPluginData = (slug: string) => {
        if ( !query.data ){
            return;
        }

        return query.data.find((plugin: OtherPlugin) => plugin.slug === slug);
    }

    const pluginActionNice = (action : string) => {
        const statuses: { [key: string]: string } = {
            'installed': __("Installed", "simplybook"),
            'download': __("Install", "simplybook"),
            'activate': __("Activate", "simplybook"),
            'activating': __("Activating...", "simplybook"),
            'downloading': __("Downloading...", "simplybook"),
            'upgrade-to-premium': __("Upgrade", "simplybook"),
        };
        return statuses[action] || '';
    }

    const runPluginAction = useMutation({
        mutationFn: async ({ slug, action, e }: { slug: string; action: string; e?: React.MouseEvent<HTMLAnchorElement, MouseEvent> }) => {
            if ( action === 'installed' || action === 'upgrade-to-premium' ) {
                return;
            }

            if (e) e.preventDefault();
            let data: any = {};
            data.slug = slug;
            data.action = action;
            let pluginItem = getPluginData(slug);
            if (!pluginItem) return;

            if (action === 'download') {
                pluginItem.action = "downloading";
            } else if (action === 'activate') {
                pluginItem.action = "activating";
            }
            updatePluginData(slug, pluginItem);

            if (action === 'installed' || action === 'upgrade-to-premium') {
                return;
            }

            let updatedPluginItem = await doPluginAction(slug, action);
            console.log("resulting plugin item", updatedPluginItem);
            //if the plugin was downloaded, we now activate.
            if (updatedPluginItem.action === 'activate' ) {
                pluginItem.action = "activating";
                updatePluginData(slug, pluginItem);
                updatedPluginItem = await doPluginAction(slug, 'activate');
            }
            updatePluginData(slug, updatedPluginItem);
        }
    });

    return {
        plugins: query.data,
        fetched: query.isFetched,
        pluginActionNice,
        runPluginAction: runPluginAction.mutate,
    };
};

export default useOtherPluginsData;
