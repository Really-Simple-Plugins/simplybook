import {useQuery} from "@tanstack/react-query";
import getOtherPlugins from "../api/endpoints/Dashboard/getOtherPlugins";
import {OtherPlugins} from "../types/OtherPlugins";
const useOtherPluginsData = () => {
    const query = useQuery<OtherPlugins>({
        queryKey: ["other_plugins"],
        // @ts-ignore
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
            },
            {
                url: "#",
                title: "...",
                action: "...",
            },
            {
                url: "#",
                title: "...",
                action: "...",
            },
        ],
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: true,
    });


    return {
        plugins: query.data,
        fetched: query.isFetched,
    };
};

export default useOtherPluginsData;
