import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../api/requests/request"; // Ensure this is the correct path to the request utility
import useOnboardingData from "./useOnboardingData";
import {useCallback, useRef, useState} from "react";

const useWaitForRegistrationCallback = () => {
    const { setOnboardingCompleted } = useOnboardingData();
    const [ pollingEnabled, setPollingEnabled ] = useState(true);
    const [ count, setCount ] = useState(0);

    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        queryFn: async () => {
            if ( !pollingEnabled ) {
                console.log("polling disabled, exting");
                return;
            }

            console.log("Polling for registration callback status");
            setCount(count + 1);
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });
            console.log("data res ",res.data );
            if (res.data.status==='completed'){
                console.log("disable polling and set onboarding completed");
                setPollingEnabled(false);
                setOnboardingCompleted(true);
            } else {
                console.log("still waiting for completion")
            }

            if ( count > 100 ){
                setPollingEnabled(false);
            }
            return res.data;
        },
        enabled: pollingEnabled,
        refetchInterval: (queryData) => {
            return pollingEnabled ? 3000 : false;
        },
        onError: (error) => {
            setPollingEnabled(false);
        },
    });

    return {
        startPolling: () => setPollingEnabled(true),
        isPolling: isFetching,
        data
    };
};
export default useWaitForRegistrationCallback;