import { useQuery } from "@tanstack/react-query";
import request from "../api/requests/request";
import useOnboardingData from "./useOnboardingData";
import { useState} from "react";

const useWaitForRegistrationCallback = () => {
    const { setOnboardingCompleted } = useOnboardingData();
    const [ pollingEnabled, setPollingEnabled ] = useState(true);
    const [ count, setCount ] = useState(0);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        initialData: { status: "waiting" },
        queryFn: async () => {
            if (!pollingEnabled) {
                console.log("Polling disabled");
                return {data: { status: "waiting" }};
            }

            setCount(count + 1);
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });

            if (res.data.status==='completed'){
                setPollingEnabled(false);
                setOnboardingCompleted(true);
            }

            if ( count > 100 ){
                setPollingEnabled(false);
            }
            return res.data;
        },
        enabled: true,
        refetchInterval: (queryData) => {
            return pollingEnabled ? 3000 : false;
        },
        onError: (error) => {
            setPollingEnabled(false);
        },
    });

    return {
        startPolling: () => setPollingEnabled(true),
        pollingEnabled,
        isPolling: isFetching
    };
};
export default useWaitForRegistrationCallback;