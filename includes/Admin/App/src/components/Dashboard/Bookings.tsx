import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockContent from "../Blocks/BlockContent";
import BlockFooter from "../Blocks/BlockFooter";
import ButtonInput from "../Inputs/ButtonInput";
import { Fragment } from "react";
import Icon from "../Common/Icon";

// @TODO: Split up into multiple components? 

const Bookings = () => {
  const FeaturedBlocks = [
    {
      title: __("Today", "simplybook"),
      value: "0",
      icon: "people",
    },
    {
      title: __("This Month", "simplybook"),
      value: "0",
      icon: "people",
    },
  ];

  const DataList = [
    {
      title: __("Most Popular Provider", "simplybook"),
      value: "0",
      uplift: "0",
      icon: "winner",
    },
    {
      title: __("Make-Up", "simplybook"),
      value: "0",
      uplift: "0",
      icon: "eye",
    },
    {
      title: __("Facebook", "simplybook"),
      value: "0",
      uplift: "0",
      icon: "horn",
    },
    {
      title: __("Booking per Visit", "simplybook"),
      value: "0",
      uplift: "0",
      icon: "time",
    },
  ];
  return (
    <Block className={"col-span-3 row-span-2"}>
      <BlockHeading title={__("Bookings", "simplybook")} controls={undefined} />
      <BlockContent className={"px-0 py-0"}>
        <div className={"flex flex-col bg-tertiary-light"}>
          <div className={"flex flex-row justify-between gap-4 px-4"}>
            {FeaturedBlocks.map((block, index) => (
              <div
                key={index}
                className={
                  "my-6 flex w-1/2 flex-col items-center justify-center rounded-lg border-2 border-transparent bg-white py-6 shadow-sm transition duration-300 ease-in-out hover:border-tertiary hover:shadow-lg hover:cursor-pointer"
                }
              >
                <Icon name={block.icon} size={"2x"} />
                <div className={"my-2 text-2xl font-extrabold"}>
                  {block.value}
                </div>
                <div className={"text-xs"}>{block.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {DataList.map((block, index) => (
            <Fragment key={index}>
              <div className={"grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-5 py-3 odd:bg-white even:bg-gray-50"}>
                <div className="flex items-center justify-center">
                  <Icon name={block.icon} />
                </div>
                <div className={"text-sm"}>{block.title}</div>
                <div className={"text-green-500 text-l font-bold"}>
                  {block.uplift}%
                </div>
                <div className={"font-bold"}>{block.value}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </BlockContent>
      <BlockFooter>
        <ButtonInput
          btnVariant={"secondary"}
          title={__("View All", "simplybook")}
        >
          {__("View Bookings", "simplybook")}
        </ButtonInput>
      </BlockFooter>
    </Block>
  );
};

Bookings.displayName = "Bookings";

export default Bookings;
