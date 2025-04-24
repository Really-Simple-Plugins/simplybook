import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import SubscriptionDataList from "./Partials/SubscriptionDataList";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import useSpecialFeaturesData from "../../hooks/useSpecialFeaturesData";
import ButtonLink from "../Buttons/ButtonLink";

const DataList = [
    {
        title: __("Providers", "simplybook"),
        link: "/v2/management/#providers",
        id: "provider_limit", // Data from useSubscriptionData is found on ID
    },
    /* {
        title: __("Services", "simplybook"),
        link: "/v2/management/#services",
        // id: "does not exist in subscription data yet"
    }, */
    {
        title: __("Bookings", "simplybook"),
        link: "v2/index/index",
        id: "sheduler_limit", // Data from useSubscriptionData is found on ID
    },
    {
        title: __("SMS Credits", "simplybook"),
        link: "/v2/r/payment-widget#/products",
        id: "sms_limit", // Data from useSubscriptionData is found on ID
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
        link: "v2/management/#plugins/paid_events",
        buttonText: __("Upgrade", "simplybook"),
        btnVariant: "primary",
        isPlugin:true,
        id: "paid_events",
    },
];

const Management = () => {

    // Load the subscription data
    const {subscription, isLoading: subscriptionDataLoading, hasError: subscriptionDataHasError} = useSubscriptionData();
    const {isPluginActive, isLoading: specialFeaturesLoading, hasError: specialFeaturesHasError} = useSpecialFeaturesData();

    let subscriptionLimits = subscription?.limits || {};

    return (
        <Block className={"col-span-12 sm:col-span-6 2xl:col-span-3 2xl:row-span-2  xl:col-span-4"}>
            <BlockHeading
                title={__("Management", "simplybook")}
                controls={undefined}
            />
            <BlockContent className={"px-0 py-0"}>
                <div>
                    {DataList.map((block, index) => (
                        <div key={index} className={"odd:bg-white even:bg-gray-50 flex justify-between items-center p-4"}>
                            {block.isPlugin && !specialFeaturesHasError && !isPluginActive(block.id) && (
                                <>
                                    <div className="text-base">{block.title}</div>
                                    <div className={"flex justify-end"}>
                                        <ButtonLink className={"border-primary text-primary"} icon={false} loginLink={block.link} btnVariant={"ghost-small"}>{__("Upgrade", "simplybook")}</ButtonLink>
                                    </div>
                                </>
                            )}
                            {!block.isPlugin && !subscriptionDataHasError && (Object.keys(subscriptionLimits).length > 0) && (
                                <SubscriptionDataList
                                    title={block.title}
                                    // @ts-ignore
                                    remaining={subscriptionLimits?.[block.id]?.rest}
                                    // @ts-ignore
                                    total={subscriptionLimits?.[block.id]?.total}
                                    // @ts-ignore
                                    page={subscriptionLimits?.[block.id]?.link}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </BlockContent>
            <BlockFooter>{""}</BlockFooter>
        </Block>
    );
};

Management.displayName = "Management";
export default Management;