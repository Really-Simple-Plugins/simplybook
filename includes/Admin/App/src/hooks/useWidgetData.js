import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {useState} from "react";
import getWidget from "../api/endpoints/getWidget";

const useWidgetData = () => {
    const queryClient = useQueryClient();

    const [widgetScript, setWidgetScript] = useState('');
    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["widget_script"],
        queryFn: async () => {
            let script = await getWidget();
            setWidgetScript(script);
            return script;
        },
        enabled: true,
        refetchInterval: (queryData) => {
            return false;
        },
        onError: (error) => {
            console.log("error in script retrieval for widget", error);
        },
    });
    const invalidateWidgetScript = () => {
        queryClient.invalidateQueries(["widget_script"]);
    };
    return {
        widgetScript,
        isFetching,
        data,
        invalidateWidgetScript
    };
};
export default useWidgetData;