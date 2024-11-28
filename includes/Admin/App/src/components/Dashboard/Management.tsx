import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import { Fragment } from "react";
import ButtonInput from "../Inputs/ButtonInput";


// @TODO: Split up into multiple components? 

const DataList = [
  {
    title: __("Providers", "simplybook"),
    link: "/providers",
    buttonText: __("View", "simplybook"),
    btnVariant: "primary",
  },
  {
    title: __("Services", "simplybook"),
    link: "/services",
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
    title: __("Directory Listing", "simplybook"),
    link: "https://simplybook.me/directory",
    buttonText: __("Upgrade", "simplybook"),
    btnVariant: "primary",
  },
  {
    title: __("Membership", "simplybook"),
    link: "https://simplybook.me/membership",
    buttonText: __("Upgrade", "simplybook"),
    btnVariant: "primary",
  },
  {
    title: __("White Label", "simplybook"),
    link: "https://simplybook.me/white-label",
    buttonText: __("Upgrade", "simplybook"),
    btnVariant: "primary",
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
              <div className={"grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 odd:bg-white even:bg-gray-50"}>
                <div className={"text-sm"}>{block.title}</div>
                <div className={"flex justify-end"}>
                <ButtonInput link={{ to: block.link }} size={"sm"} btnVariant={"tertiary"}>{block.buttonText}</ButtonInput>
                </div>
              </div>
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

