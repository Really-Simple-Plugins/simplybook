import React from "react";
import LoginLink from "../../Common/LoginLink";
import { __ } from "@wordpress/i18n";
import Label from "../../Common/Label";
import clsx from "clsx";
import { SubscriptionDataListProps } from "../../../types/subscriptiondata/SubscriptionDataListProps";

const linkClassName = "text-base relative text-tertiary border-b-4 border-transparent [&.active]:border-tertiary focus:outline-hidden";

const SubscriptionDataList: React.FC<SubscriptionDataListProps> = ({
    className,
    title,
    remaining,
    total,
    isLoading
}) => {

    const labelClassName = (
        remaining < 0 ? "border-red-600 text-red-600" : (
            remaining > total ?  "border-red-600 text-red-600" : "border-green-600 text-green-600"
        )
    );

    return (
    <>
        {!isLoading && (
            <div className={clsx("flex justify-between items-center p-4", className)}>
                <LoginLink className={linkClassName} page="providers">
                    {__(`${title}`, "simplybook")}
                </LoginLink>
                <Label labelVariant="ghost" className={labelClassName}>
                    {remaining} / {total}
                </Label>
            </div>
        )}
    </>
    );
}

export default SubscriptionDataList;