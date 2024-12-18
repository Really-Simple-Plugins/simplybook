import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../api/requests/request"; // Ensure this is the correct path to the request utility
import useOnboardingData from "./useOnboardingData";
import {useState} from "react";

const useWaitForRegistrationCallback = () => {
    const { setOnboardingCompleted } = useOnboardingData();
    const [ pollingEnabled, setPollingEnabled ] = useState(true);
    const [ count, setCount ] = useState(0);

    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        queryFn: async () => {
            setCount(count + 1);
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });
            console.log("check registration callback status", res);

            if (res.data.status==='completed'){
                console.log("disable polling and set onboarding completed");
                setPollingEnabled(false);
                setOnboardingCompleted(true);
            }

            if (count > 20){
                setPollingEnabled(false);
            }
            return res.data;
        },
        enabled: pollingEnabled, // Control polling via state
        refetchInterval: (queryData) => {
            return pollingEnabled ? 2000 : false;
        },
        onError: (error) => {
            setPollingEnabled(false); // Optionally stop polling on error
        },
    });

    return { startPolling: () => setPollingEnabled(true), isFetching, data };
};
export default useWaitForRegistrationCallback;