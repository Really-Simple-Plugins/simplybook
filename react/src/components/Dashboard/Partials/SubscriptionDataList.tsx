import React from "react";
import LoginLink from "../../Common/LoginLink";
import { __ } from "@wordpress/i18n";
import Label from "../../Common/Label";
import { SubscriptionDataListProps } from "../../../types/subscriptiondata/SubscriptionDataListProps";

const linkClassName = "text-base relative text-tertiary border-b-4 border-transparent [&.active]:border-tertiary focus:outline-hidden";

const SubscriptionDataList: React.FC<SubscriptionDataListProps> = ({
    title,
    remaining,
    total,
    page,
}) => {

    const labelClassName = (
        remaining <= 0 ? "border-red-600 text-red-600" : (
            remaining > total ?  "border-red-600 text-red-600" : "border-green-600 text-green-600"
        )
    );

    return (
        <>
            <LoginLink
                iconName="square-arrow-up-right"
                iconClass="px-2"
                className={linkClassName}
                page={page}
            >
                {__(`${title}`, "simplybook")}
            </LoginLink>
            <Label labelVariant="ghost" className={labelClassName}>
                {total - remaining} / {total}
            </Label>
        </>
    );
}

export default SubscriptionDataList;