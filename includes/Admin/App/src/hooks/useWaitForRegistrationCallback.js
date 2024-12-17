import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../api/requests/request"; // Ensure this is the correct path to the request utility
import useOnboardingData from "./useOnboardingData";

const useWaitForRegistrationCallback = () => {
    const { setOnboardingCompleted } = useOnboardingData();

    // Use Query for polling logic
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["registration_callback_status"],
        queryFn: async () => {
            const res = await request("check_registration_callback_status", "POST", {
                data: { status: "waiting" },
            });
            console.log("Polling response", res.data.status);
            return res.data;
        },
        enabled: false, // Initially disabled, starts only when manually triggered
        refetchInterval: (queryData) => {
            // Stops polling if the status is 'completed', otherwise refetch every 5 seconds
            return queryData?.status === "completed" ? false : 1000;
        },
        onSuccess: (data) => {
            if (data.status === "completed") {
                console.log("Registration complete, unlocking onboarding links!");
                setOnboardingCompleted(true);
            }
        },
        onError: (error) => {
            console.error("Error while polling registration status:", error);
        },
    });

    return { startPolling: refetch, isFetching, data };
};
export default useWaitForRegistrationCallback;