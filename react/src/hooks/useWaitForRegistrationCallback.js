import { useQuery } from "@tanstack/react-query";
import request from "../api/requests/request";
import useOnboardingData from "./useOnboardingData";
import { useState} from "react";

const useWaitForRegistrationCallback = () => {
    const {onboardingCompleted, setOnboardingCompleted} = useOnboardingData();
    const [ pollingEnabled, setPollingEnabled ] = useState(!onboardingCompleted);
    const [ queryData, setQueryData ] = useState({ status: "waiting" });
    const [ count, setCount ] = useState(0);
    const [pollingSuccess, setPollingSuccess] = useState(false);

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        initialData: { status: "waiting" },
        queryFn: async () => {

            if ( !pollingEnabled ) {
                console.log("Polling disabled");
                return queryData;
            }

            setCount(count + 1);
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });
            setQueryData(res.data);
            if (res.data.status==='completed'){
                setPollingEnabled(false);
                setPollingSuccess(true);
                setOnboardingCompleted(true);
            }

            if ( count > 100 ){
                setPollingEnabled(false);
            }
            return res.data;
        },
        enabled: !!pollingEnabled,
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
        isPolling: isFetching,
        pollingSuccess,
    };
};
export default useWaitForRegistrationCallback;