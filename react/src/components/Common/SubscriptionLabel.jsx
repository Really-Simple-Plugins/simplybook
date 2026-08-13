import { __ } from "@wordpress/i18n";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import Label from "./Label";

const getSubscriptionLabelText = (subscriptionPlan, expiresIn) => {
    if (subscriptionPlan.toUpperCase() === "TRIAL" || expiresIn < 30) {
        return `${subscriptionPlan} - ${expiresIn} ${__("days left", "simplybook")}`;
    }

    return subscriptionPlan;
};

const SubscriptionLabel = () => {
    const { subscriptionPlan, expiresIn, isExpired, isLoading } = useSubscriptionData();
    const plansPricesUrl = simplybook?.plans_prices_url || "";

    if (isLoading || !subscriptionPlan) {
        return null;
    }

    const labelVariant = isExpired ? "trial-expired" : "trial";
    const labelText = isExpired
        ? `${subscriptionPlan} ${__("is expired.", "simplybook")}`
        : getSubscriptionLabelText(subscriptionPlan, expiresIn);

    const subscriptionLabel = (
        <Label labelVariant={labelVariant}>
            {labelText}
        </Label>
    );

    if (!plansPricesUrl) {
        return subscriptionLabel;
    }

    return (
        <a href={plansPricesUrl} className="no-underline hover:opacity-80 focus:outline-hidden">
            {subscriptionLabel}
        </a>
    );
};

SubscriptionLabel.displayName = "SubscriptionLabel";

export default SubscriptionLabel;
