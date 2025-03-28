import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Fragment } from "react";
import Plugin from "./Partials/Plugin";
import Manage from "./Partials/Manage";

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


const Management = () => {
  return (
    <Block className={"col-span-3 row-span-2"}>
      <BlockHeading
        title={__("Management", "simplybook")}
        controls={undefined}
      />
      <BlockContent className={"px-0 py-0"}>
        <div>
          {DataList.map((block, index) => (
              <Fragment key={index}>
                {block.isPlugin ? (
                    <Plugin title={block.title} link={block.link} id={block.id}/>
                ) : (
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