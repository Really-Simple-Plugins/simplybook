import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import{ SubscriptionDataListHorizontalProps } from "../../../types/subscriptiondata/SubscriptionDataListHorizontalProps";
import ListWithIcon from "../../Common/ListWithIcon";
import useSubscriptionData from "../../../hooks/useSubscriptionData";
import useServicesData from "../../../hooks/useServicesData";

const SubscriptionDataListHorizontal: React.FC<SubscriptionDataListHorizontalProps> = ({
    className,
}) => {
    // Load the subscription data
    const {
        smsRemaining,
        bookingsRemaining,
        expiresIn,
        isExpired,
        isLoading,
        hasError
    } = useSubscriptionData();

    return (
        <>
        {!isLoading && !hasError && (
            <ul className={clsx("list-none flex gap-2", className)}>
                <ListWithIcon
                    iconColor={(expiresIn == 0 || isExpired) ? "red" : "var(--color-green-600)"}
                    iconName={isExpired ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {isExpired ? (
                        <>
                            {__("Your trial has expired", "simplybook")}
                        </>
                    ) : (
                        <>
                            {__('Trial:', 'simplybook')} {expiresIn} {__("days left", "simplybook")}
                        </>
                    )}
                </ListWithIcon>
                <ListWithIcon
                    iconColor={smsRemaining <= 0 ? "red" : "var(--color-green-600)"}
                    iconName={smsRemaining <= 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('SMS Credits:', 'simplybook')} {smsRemaining}
                </ListWithIcon>
                <ListWithIcon
                    iconColor={bookingsRemaining <= 0 ? "red" : "var(--color-green-600)"}
                    iconName={bookingsRemaining <= 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('Bookings:', 'simplybook')} {bookingsRemaining}
                </ListWithIcon>
            </ul>
        )}
        </>
    );
};

export default SubscriptionDataListHorizontal;