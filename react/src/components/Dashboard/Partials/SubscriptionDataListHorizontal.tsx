import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import{ SubscriptionDataListHorizontalProps } from "../../../types/subscriptiondata/SubscriptionDataListHorizontalProps";
import ListWithIcon from "../../Common/ListWithIcon";
import useSubscriptionData from "../../../hooks/useSubscriptionData";

const SubscriptionDataListHorizontal: React.FC<SubscriptionDataListHorizontalProps> = ({
    className,
    target,
}) => {
    // Load the subscription data
    const {
        subscriptionPlan,
        expiresIn,
        isExpired,
        isLoading,
        hasError
    } = useSubscriptionData();

    // If a target is given we abort when the subscription plan does not match
    if (target && subscriptionPlan.toUpperCase() !== target.toUpperCase()) {
        return null;
    }

    const plansPricesUrl = simplybook?.plans_prices_url || "";

    let message = subscriptionPlan + ': ' + expiresIn + ' ' + __("days left", "simplybook");
    let expiredMessage = subscriptionPlan + ' ' + __("ended - choose your plan", "simplybook");
    let expiredContent = plansPricesUrl ? (
        <a href={plansPricesUrl} className="text-black hover:underline" title={__("You can continue for free with up to 50 bookings per month.", "simplybook")}>
            {expiredMessage}
        </a>
    ) : expiredMessage;

    return (
        <>
            {!isLoading && !hasError && (
                <ul className={clsx("list-none flex flex-col  2xl:flex-row 2xl:justify-end 2xl:flex-wrap gap-2", className)}>
                    <ListWithIcon
                        iconColor={(expiresIn == 0 || isExpired) ? "red" : "var(--color-green-600)"}
                        iconName={isExpired ? "circle-xmark" : "circle-check"}
                        iconSize="md"
                    >
                        {isExpired ? expiredContent : message}
                    </ListWithIcon>
                </ul>
            )}
        </>
    );
};

export default SubscriptionDataListHorizontal;