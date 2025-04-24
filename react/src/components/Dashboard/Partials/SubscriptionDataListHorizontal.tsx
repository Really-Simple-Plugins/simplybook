import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import{ SubscriptionDataListHorizontalProps } from "../../../types/subscriptiondata/SubscriptionDataListHorizontalProps";
import ListWithIcon from "../../Common/ListWithIcon";
import useSubscriptionData from "../../../hooks/useSubscriptionData";

const SubscriptionDataListHorizontal: React.FC<SubscriptionDataListHorizontalProps> = ({
    className,
}) => {
    // Load the subscription data
    const {
        expiresIn,
        isExpired,
        isLoading,
        hasError
    } = useSubscriptionData();

    return (
        <>
        {!isLoading && !hasError && (
            <ul className={clsx("list-none flex flex-col  2xl:flex-row 2xl:justify-end 2xl:flex-wrap gap-2", className)}>
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
            </ul>
        )}
        </>
    );
};

export default SubscriptionDataListHorizontal;