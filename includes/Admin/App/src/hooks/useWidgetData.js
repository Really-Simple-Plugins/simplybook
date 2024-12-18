import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {useState} from "react";
import getWidget from "../api/endpoints/getWidget";

const useWidgetData = () => {
    const [widgetScript, setWidgetScript] = useState('');
    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        queryFn: async () => {
            let script = await getWidget();

            setWidgetScript(script);
        },
        enabled: true,
        refetchInterval: (queryData) => {
            return false;
        },
        onError: (error) => {
            console.log("error in script retrieval for widget", error);
        },
    });

    return {
        widgetScript,
        isFetching,
        data
    };
};
export default useWidgetData;