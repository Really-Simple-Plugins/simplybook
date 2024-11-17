import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockContent from "../Blocks/BlockContent";
import BlockFooter from "../Blocks/BlockFooter";
import ButtonInput from "../Inputs/ButtonInput";

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
      <BlockContent className={"p-0"}>
        <div className={"bg-tertiary-light flex flex-col"}>
          <div className={"flex flex-row justify-between gap-4 px-4"}>
            {FeaturedBlocks.map((block, index) => (
              <div
                key={index}
                className={
                  "hover:border-tertiary my-6 flex w-1/2 flex-col items-center justify-center rounded-lg border-2 border-transparent bg-white py-6 shadow-sm transition duration-300 ease-in-out hover:shadow-lg"
                }
              >
                <div className={"text-2xl font-bold"}>{block.icon}</div>
                <div className={"my-2 text-2xl font-extrabold"}>
                  {block.value}
                </div>
                <div className={"text-xs"}>{block.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={"grid auto-rows-max grid-cols-4 gap-2 p-2"}>
            {DataList.map((block, index) => (
              <>
                <div className={"text-2xl font-bold"}>{block.icon}</div>
                <div className={"text-sm"}>{block.title}</div>
                <div className={"ml-auto text-2xl font-bold"}>
                  {block.uplift}
                </div>
                <div className={"text-2xl font-bold"}>{block.value}</div>
              </>
            ))}
          </div>
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

export default Bookings;
