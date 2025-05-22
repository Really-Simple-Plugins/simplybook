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
            icon: "calendar-day",
        },
        {
            title: __("This week", "simplybook"),
            value: bookingsThisWeek ?? __('Loading', 'simplybook'),
            icon: "calendar-week",
        },
    ];

    const MostPopularDataList = [
        {
            title: __("Service Provider", "simplybook"),
            key: "provider",
            value: mostPopularProviderName,
            bookings: mostPopularProviderBookings,
        },
        {
            title: __("Service", "simplybook"),
            key: "service",
            value: mostPopularServiceName,
            bookings: mostPopularServiceBookings,
        },
    ];

    return (
        <Block className={"col-span-12 sm:col-span-6 xl:col-span-3 2xl:col-span-3 2xl:row-span-2"}>
            <BlockHeading title={__("Bookings", "simplybook")} controls={undefined} />
            <BlockContent className={"px-0 py-0"}>
                <div className={"flex flex-col bg-tertiary-light"}>
                    <div className={"flex flex-row justify-between gap-4 px-5 py-4"}>
                        {FeaturedBlocks.map((block, index) => (
                            <div
                                key={index}
                                className={ "my-2 flex w-1/2 flex-col items-center justify-center rounded-lg border-2 border-transparent bg-white py-4 shadow-sm"}
                            >
                                <Icon name={block.icon} size={"2x"} />
                                <div className={"text-sm my-2"}>{block.title}</div>
                                <div className={" text-2xl font-extrabold"}>
                                    {block.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {!isLoading && !hasError && (
                    <div className="mt-4 mx-5 bg-primary-lighter rounded-md border-1 border-[#E1E7F5]">
                        <span className="text-succes flex items-center w-full mb-3 px-4 py-3 border-b-[#E1E7F5] border-b-1">
                            <Icon 
                                style={{ color: "var(--color-success)" }} 
                                name="trophy" 
                                size={"1x"} 
                                className="mr-2" 
                            />
                            <p className="text-base font-semibold m-0">{__("Most popular", "simplybook")} - {__("Last 30 days", "simplybook")}</p>   
                        </span>
                        {(mostPopularProviderName === "" || mostPopularServiceName === "") ? (
                           <p className="text-base font-semibold m-0 px-4 mb-3 text-gray-500 italic">{ __("No bookings yet...", "simplybook")}</p>  
                        ) : (
                            <>
                                {MostPopularDataList.map((block, index) => (
                                    <Fragment key={index}>
                                        <MostPopular 
                                            key={block.key} 
                                            title={block.title} 
                                            mostPopularName={block.value}
                                            bookingAmount={block.bookings} 
                                        />
                                    </Fragment>
                                ))}
                            </>
                        )}  


                      

                    </div>
                )}
            </BlockContent>
            <BlockFooter>
                <ButtonLink 
                    className="!border-sb-blue !text-sb-blue flex-row-reverse" 
                    icon={true} 
                    iconName="target-blank" 
                    iconClass="fa-regular" 
                    reverseIcon={true}  
                    btnVariant="square-ghost-small" 
                    loginLink="v2/index/index"
                >
                    {__("View Bookings", "simplybook")}
                </ButtonLink>
            </BlockFooter>
        </Block>
    );
};

Bookings.displayName = "Bookings";

export default Bookings;