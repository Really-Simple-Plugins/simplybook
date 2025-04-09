import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Fragment } from "react";
import Manage from "./Partials/Manage";
import SubscriptionDataList from "./Partials/SubscriptionDataList";
import useSubscriptionData from "../../hooks/useSubscriptionData";


const DataList = [
    {
        title: __("Providers", "simplybook"),
        link: "/settings/providers",
        buttonText: __("View", "simplybook"),
        btnVariant: "primary",
    },
    {
        title: __("Services", "simplybook"),
        link: "/settings/services",
        buttonText: __("View", "simplybook"),
        btnVariant: "primary",
    },
    {
        title: __("Bookings", "simplybook"),
        link: "/settings",
        buttonText: __("View", "simplybook"),
        btnVariant: "primary",
    },
    {
        title: __("SMS Gateway", "simplybook"),
        link: "v2/management/#plugins/sms",
        buttonText: __("Upgrade", "simplybook"),
        btnVariant: "primary",
        isPlugin:true,
        id: "sms",
    },
    {
        title: __("Membership", "simplybook"),
        link: "v2/management/#plugins/membership",
        buttonText: __("Upgrade", "simplybook"),
        btnVariant: "primary",
        isPlugin:true,
        id: "memberships"
    },
    {
        title: __("Paid Events", "simplybook"),
        link: "management/#plugins/paid_events",
        buttonText: __("Upgrade", "simplybook"),
        btnVariant: "primary",
        isPlugin:true,
        id: "paid_events",
    },
];

const Management = () => {

    // Load the subscription data
    const {
        subscription,
        smsRemaining,
        isLoading,
        hasError,
    } = useSubscriptionData();

    // Create an empty array to store the limits
    let selectedLimits = {};

    // Load the limits we want to show
    if (!isLoading && subscription) {
        const subscriptionObject = subscription?.limits;
        const allowed = ['provider_limit', 'sheduler_limit'];

        selectedLimits = Object.keys(subscriptionObject)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                // @ts-ignore
                obj[key] = subscriptionObject[key];
                return obj;
            }, {});

    }

    return (
        <Block className={"col-span-3 row-span-2"}>
            <BlockHeading
                title={__("Management", "simplybook")}
                controls={undefined}
            />
            <BlockContent className={"px-0 py-0"}>
                <div>
                    {!isLoading && selectedLimits && Object.entries(selectedLimits).map(([key, value]) => (
                        <SubscriptionDataList
                            key={key}
                            title={__(`${key.replace('_limit', '').charAt(0).toUpperCase() + key.replace('_limit', '').slice(1)}`, "simplybook")}
                            // @ts-ignore
                            remaining={value.rest}
                            // @ts-ignore
                            total={value.total}
                            isLoading={isLoading}
                        />
                    ))}
                    {DataList.map((block, index) => (
                        <Fragment key={index}>
                            {block.isPlugin && (
                                <Manage title={block.title} link={block.link} buttonText={block.buttonText} />
                            )}
                        </Fragment>
                    ))}
                </div>
            </BlockContent>
            <BlockFooter>{""}</BlockFooter>
        </Block>
    );
};

Management.displayName = "Management";
export default Management;