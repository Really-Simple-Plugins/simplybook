import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import getOtherPlugins from "../api/endpoints/Dashboard/getOtherPlugins";
import {OtherPlugins} from "../types/OtherPlugins";
import {OtherPlugin} from "../types/OtherPlugin";
import {__} from "@wordpress/i18n";
import doPluginAction from "../api/endpoints/Dashboard/doPluginAction";
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
                title: "loading",
                action: "...",
                actionNiceName: "...",
                slug: "...",
            },
            {
                url: "#",
                title: "...",
                action: "...",
                actionNiceName: "...",
                slug: "...",
            },
            {
                url: "#",
                title: "...",
                action: "...",
                actionNiceName: "...",
                slug: "...",
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
            'download': __("Install", "simplybook"),
            'activate': __("Activate", "simplybook"),
            'activating': __("Activating...", "simplybook"),
            'downloading': __("Downloading...", "simplybook"),
            'upgrade-to-premium': __("Downloading...", "simplybook"),
        };
        return statuses[action] || '';
    }

    const runPluginAction = useMutation({
        mutationFn: async ({ slug, action, e }: { slug: string; action: string; e?: Event }) => {
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
            pluginItem.actionNiceName = pluginActionNice(pluginItem.action);
            updatePluginData(slug, pluginItem);

            if (action === 'installed' || action === 'upgrade-to-premium') {
                return;
            }

            const updatedPluginItem = await doPluginAction(slug, action);
            updatePluginData(slug, updatedPluginItem);
        }
    });

    return {
        plugins: query.data,
        fetched: query.isFetched,
        runPluginAction: runPluginAction.mutate,
    };
};

export default useOtherPluginsData;
