import React from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Fragment } from "react";
import Manage from "./Partials/Manage";
import SubscriptionDataList from "./Partials/SubscriptionDataList";
import useSubscriptionData from "../../hooks/useSubscriptionData";



// @TODO: Split up into multiple components?

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

const subscriptionArray = [
    {
      key: "provider_limit",
      total: 5,
      rest: 3,
    },
    {
      key: "service_limit",
      total: 4,
      rest: 5,
    },
    {
      key: "sheduler_limit",
      total: 10,
      rest: 7,
    },
];


const Management = () => {
  // Load the subscription data
  const { 
    subscription, 
    isLoading, 
    hasError,
   } = useSubscriptionData();

  // const subscriptionLimits = subscription?.data?.limits;
  const subscriptionLimits = subscriptionArray;

  return (
    <Block className={"col-span-3 row-span-2"}>
      <BlockHeading
        title={__("Management", "simplybook")}
        controls={undefined}
      />
      <BlockContent className={"px-0 py-0"}>
        <div>
          {subscriptionLimits.map((limit) => (
            <React.Fragment key={limit.key}>
              {limit.key === 'provider_limit' && (
                <SubscriptionDataList
                  title={__("Providers", "simplybook")}
                  remaining={limit.rest}
                  total={limit.total}
                  isLoading={isLoading}
                />
              )}
              {limit.key === 'sheduler_limit' && (
                <SubscriptionDataList
                  title={__("Bookings", "simplybook")}
                  remaining={limit.rest}
                  total={limit.total}
                  isLoading={isLoading}
                />
              )}
              {limit.key === 'service_limit' && (
                <SubscriptionDataList
                  title={__("Services", "simplybook")}
                  remaining={limit.rest}
                  total={limit.total}
                  isLoading={isLoading}
                />
              )}
            </React.Fragment>
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