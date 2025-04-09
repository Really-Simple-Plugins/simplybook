import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __ } from "@wordpress/i18n";
import BlockContent from "../Blocks/BlockContent";
import BlockFooter from "../Blocks/BlockFooter";
import {Fragment} from "react";
import Icon from "../Common/Icon";
import useStatisticsData from "../../hooks/useStatisticsData";
import ButtonLink from "../Buttons/ButtonLink";
import MostPopular from "./Partials/MostPopular";

const Bookings = () => {

    const {
        mostPopularProviderName,
        mostPopularProviderBookings,
        mostPopularServiceName,
        mostPopularServiceBookings,
        bookingsToday,
        bookingsThisWeek,
        bookingsLastThirtyDays,
        isLoading,
        hasError,
    } = useStatisticsData();

    const FeaturedBlocks = [
        {
            title: __("Today", "simplybook"),
            value: bookingsToday ?? __('Loading', 'simplybook'),
            icon: "user-group",
        },
        {
            title: __("This week", "simplybook"),
            value: bookingsThisWeek ?? __('Loading', 'simplybook'),
            icon: "user-group",
        },
    ];

    const DataList = [
        {
            title: __("Most popular provider", "simplybook"),
            key: "provider",
            value: mostPopularProviderName ?? 'Provider not loaded',
            uplift: mostPopularProviderBookings,
        },
        {
            title: __("Most popular service", "simplybook"),
            key: "service",
            value: mostPopularServiceName ?? 'Service not loaded',
            uplift: mostPopularServiceBookings,
        },
    ];

    return (
        <Block className={"col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3 2xl:row-span-2"}>
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
                                <div className={"text-sm my-4"}>{block.title}</div>
                                <div className={" text-2xl font-extrabold"}>
                                    {block.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {!isLoading && !hasError && (                    
                    <div className="mt-4 px-4">
                        {DataList.map((block, index) => (
                            <Fragment key={index}>
                                <MostPopular key={block.key} title={block.value} bookingAmount={block.uplift} />
                            </Fragment>
                        ))}
                    </div>
                )}
            </BlockContent>
            <BlockFooter>
                <ButtonLink className="!border-button-blue !text-button-blue flex-row-reverse" icon={true} iconName="target-blank" iconClass="fa-regular" reverseIcon={true}  btnVariant="square" loginLink="v2/r/bookings/">
                    {__("View Bookings", "simplybook")}
                </ButtonLink>
            </BlockFooter>
        </Block>
    );
};

Bookings.displayName = "Bookings";

export default Bookings;