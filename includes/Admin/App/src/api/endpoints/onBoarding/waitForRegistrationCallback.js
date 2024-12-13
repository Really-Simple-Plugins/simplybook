import request from "../../requests/request";
import useOnboardingData from "../../../hooks/useOnboardingData";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const waitForRegistrationCallback = async () => {
    const {
        setOnboardingCompleted,
    } = useOnboardingData();
    //check the registration callback status every 5 seconds until it completes, with a maximum of 5 minutes.
    let timeElapsed = 0;
    const data = {
        status: "waiting",
    };
    while (timeElapsed < 300) {
        const res = await request("onboarding/check_registration_callback_status", "POST", { data });
        console.log("waitForRegistrationCallback response", res);
        if (res.data.status === "completed") {
            console.log("registration complete, unlock the links!")
            setOnboardingCompleted(true);
            return;
        }
        console.log("not complete yet, try again in 5 seconds")
        await new Promise((resolve) => setTimeout(resolve, 5000));
        timeElapsed += 5;
    }
    console.log("registration callback timeout, unlock the links!")
};

export default waitForRegistrationCallback;