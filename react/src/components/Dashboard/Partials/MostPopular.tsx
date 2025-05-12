import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { MostPopularProps } from "../../../types/MostPopular";
import Icon from "../../Common/Icon";

const MostPopular: React.FC<MostPopularProps> = ({
    className = "",
    title,
    mostPopularName,
    bookingAmount
}) => {
    return (
        <>
            <div className={clsx("flex flex-wrap justify-between items-center rounded-md mb-4 border-2 border-[#E1E7F5] p-4 bg-primary-lighter text-base font-bold" , className)}>
                <span className="text-succes flex items-center w-full mb-2">
                    <Icon style={{ color: "var(--color-success)" }} name="trophy" size={"1x"} className="mr-2" />
                    <p className="text-base font-semibold m-0">{title}</p>   
                </span>
                <div className="flex items-center justify-between w-full">
                    {mostPopularName ? (
                        <>
                            <p className="text-base font-semibold m-0">{mostPopularName}</p>
                            <div className="flex font-semibold">
                                <p className="text-base m-0">{__("This week", "simplybook")}:</p>
                                <p className="text-succes text-base m-0 ml-1">{bookingAmount}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-base font-semibold m-0 text-gray-500 italic">{ __("No bookings yet...", "simplybook")}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MostPopular;