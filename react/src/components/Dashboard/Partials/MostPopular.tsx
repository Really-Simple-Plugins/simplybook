import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { MostPopularProps } from "../../../types/MostPopular";

const MostPopular: React.FC<MostPopularProps> = ({
    className = "",
    title = '',
    mostPopularName = '',
    bookingAmount = 0,
}) => {
    return (
        <>
            <div className={clsx("flex flex-wrap justify-between items-center mb-4 last:mb-3 text-base font-bold px-4 " , className)}>
                <div className="flex flex-wrap justify-between w-full items-start ">
                    <div className="flex flex-wrap justify-between items-start w-full">
                        <p className="text-succes text-xs font-semibold m-0 mb-1">{title}</p>
                        <div className="flex justify-between w-full">
                            <p className="text-base font-medium m-0 ">{(bookingAmount === 0 ? __('Not yet calculated', 'simplybook') + '...' : mostPopularName)}</p>
                            {(bookingAmount > 0) && (
                                <p className="text-succes text-base m-0 ml-1">{bookingAmount}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MostPopular;