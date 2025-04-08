import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import{ SubscriptionDataListHorizontal as SubscriptionDataProps } from "../../../types/subscriptiondata/SubscriptionDataListHorizontalProps";
import ListWithIcon from "../../Common/ListWithIcon";
import useSubscriptionData from "../../../hooks/useSubscriptionData";
import useServicesData from "../../../hooks/useServicesData";

const SubscriptionData: React.FC<SubscriptionDataProps> = ({
    className,
}) => {
    // Load the subscription data
    const { 
        subscription, 
        smsRemaining, 
        smsTotal,
        bookingsRemaining, 
        bookingsTotal,
        providersRemaining,
        providersTotal,
        expiresIn,
        isExpired, 
        isLoading, 
        hasError 
    } = useSubscriptionData();

    console.error(subscription, isLoading, isExpired, hasError);
    
    // const trialExpired = isExpired;
    // const trialDaysLeft = expiresIn;
    // const smsCredits = smsRemaining;
    // const bookingsRemainingAmount = bookingsRemaining;

    // DUMMY LIST DATA
    const trialExpired = true;
    const trialDaysLeft = 3;
    const smsCredits = -230;
    const bookingsRemainingAmount = 34;

    return (
        <> 
            <ul className={clsx("list-none flex gap-2", className)}>
                <ListWithIcon
                    iconColor={trialDaysLeft < 0 ? "red" : "var(--color-green-600)"}
                    iconName={trialDaysLeft < 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {trialExpired ? (
                        <>
                            {__("Your trial has expired", "simplybook")}
                        </>
                    ) : (
                        <>
                            {__('Trial:', 'simplybook')} {trialDaysLeft} {__("days left", "simplybook")}
                        </>
                    )}
                </ListWithIcon>
                <ListWithIcon
                    iconColor={smsCredits < 0 ? "red" : "var(--color-green-600)"}
                    iconName={smsCredits < 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('SMS Credits:', 'simplybook')} {smsCredits}
                </ListWithIcon>
                <ListWithIcon
                    iconColor={bookingsRemainingAmount < 0 ? "red" : "var(--color-green-600)"}
                    iconName={bookingsRemainingAmount < 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('Bookings:', 'simplybook')} {bookingsRemainingAmount}
                </ListWithIcon>
            </ul>
        </>
    );
};

export default SubscriptionData;