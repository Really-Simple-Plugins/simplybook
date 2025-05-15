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
            <div className={clsx("flex flex-wrap justify-between items-center rounded-md mb-4 last:mb-3 text-base font-bold px-4 " , className)}>
                <div className="flex flex-wrap justify-between w-full items-start ">
                    {mostPopularName ? (
                        <div className="flex flex-wrap justify-between items-start w-full">
                            <p className="text-succes text-xs font-semibold m-0 mb-1">{title}</p> 
                            <div className="flex justify-between w-full">
                                <p className="text-base font-medium m-0 ">{mostPopularName}</p>
                                <p className="text-succes text-base m-0 ml-1">{bookingAmount}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-base font-semibold m-0 text-gray-500 italic">{ __("No bookings yet...", "simplybook")}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MostPopular;