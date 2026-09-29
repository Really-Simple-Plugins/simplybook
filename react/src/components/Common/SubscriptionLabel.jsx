import { __, sprintf } from "@wordpress/i18n";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import Label from "./Label";

const getSubscriptionLabelText = (subscriptionPlan, expiresIn) => {
    if (subscriptionPlan.toUpperCase() === "TRIAL" || expiresIn < 30) {
        return sprintf(
            /* translators: 1: Subscription plan name. 2: Number of days left. */
            __("%1$s - %2$d days left", "simplybook"),
            subscriptionPlan,
            expiresIn,
        );
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
        ? sprintf(
            /* translators: %s: Subscription plan name. */
            __("%s ended - choose your plan", "simplybook"),
            subscriptionPlan,
        )
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
        <a href={plansPricesUrl} className="no-underline hover:opacity-80 focus:outline-hidden" title={__("Choose your plan", "simplybook")}>
            {subscriptionLabel}
        </a>
    );
};

SubscriptionLabel.displayName = "SubscriptionLabel";

export default SubscriptionLabel;
