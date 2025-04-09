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
        subscription
        smsRemaining, 
        bookingsRemaining, 
        expiresIn,
        isExpired, 
        isLoading, 
        hasError 
    } = useSubscriptionData();

    // Initiate the data 
    const trialExpired = isExpired;
    const trialDaysLeft =  !isLoading ? expiresIn : __("No data found", "simplybook");
    const smsCredits = !isLoading ? smsRemaining : __("No data found", "simplybook");
    const bookingsRemainingAmount = !isLoading ? bookingsRemaining : __("No data found", "simplybook");;

    console.log(subscription);

    return (
        <> 
        {!isLoading && !hasError && (          
            <ul className={clsx("list-none flex gap-2", className)}>
                <ListWithIcon
                    iconColor={trialDaysLeft == 0 || trialExpired ? "red" : "var(--color-green-600)"}
                    iconName={trialExpired ? "circle-xmark" : "circle-check"}
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
                    iconColor={smsCredits < 0 || smsCredits == 0 ? "red" : "var(--color-green-600)"}
                    iconName={smsCredits < 1 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('SMS Credits:', 'simplybook')} {smsCredits}
                </ListWithIcon>
                <ListWithIcon
                    iconColor={bookingsRemainingAmount < 0 || bookingsRemainingAmount == 0 ? "red" : "var(--color-green-600)"}
                    iconName={bookingsRemainingAmount < 0 ? "circle-xmark" : "circle-check"}
                    iconSize="md"
                >
                    {__('Bookings:', 'simplybook')} {bookingsRemainingAmount}
                </ListWithIcon>
            </ul>
        )}
        </>
    );
};

export default SubscriptionData;