import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../api/requests/request"; // Ensure this is the correct path to the request utility
import useOnboardingData from "./useOnboardingData";
import {useRef, useState} from "react";

const useWaitForRegistrationCallback = () => {
    const { setOnboardingCompleted } = useOnboardingData();
    const [ pollingEnabled, setPollingEnabled ] = useState(true);
    const [ count, setCount ] = useState(0);
    const [ paused, setPaused ] = useState(false);
    const previousDataRef = useRef(null);

    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        queryFn: async () => {
            console.log("paused status in query fetch", paused);
            if (paused){
                return;
            }
            console.log("Polling for registration callback status");
            setCount(count + 1);
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });

            // Check if the data has changed
            if (JSON.stringify(res.data) === JSON.stringify(previousDataRef.current)) {
                console.log("No change in data, skipping update");
                return previousDataRef.current;
            }

            // Update previous data reference
            previousDataRef.current = res.data;

            if (res.data.status==='completed'){
                console.log("disable polling and set onboarding completed");
                setPollingEnabled(false);
                setOnboardingCompleted(true);
            } else {
                console.log("still waiting for completion")
            }

            if (count > 100 ){
                setPollingEnabled(false);
            }
            return res.data;
        },
        enabled: pollingEnabled, // Control polling via state
        refetchInterval: (queryData) => {
            return pollingEnabled && !paused ? 2000 : false;
        },
        onError: (error) => {
            setPollingEnabled(false); // Optionally stop polling on error
        },
    });

    const pauseRerenders = (paused) => {
        console.log("we are pausing rerenders", paused);
        setPaused(paused);
    }

    return {
        paused,
        pauseRerenders,
        startPolling: () => setPollingEnabled(true), isFetching, data };
};
export default useWaitForRegistrationCallback;