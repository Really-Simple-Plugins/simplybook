import React from "react";
import clsx from "clsx";
import { TipsProps } from "../../../types/TipsProps";
import { Link } from "@tanstack/react-router";

const Tip: React.FC<TipsProps> = ({ 
    link, 
    title, 
    content 
}) => { 
    return (
        <>
            <Link
                className="tip-body mb-1 " 
                target={"_blank"}
                to={link}
            >
                <div className="tip-inner flex flex-row justify-start items-center text-base">
                    <p className="
                        transition-all duration-300 ease-in-out m-0 text-base text-[#333333]  py-1
                        hover:text-primary hover:underline
                    ">
                        <span className={"font-bold  border-primary-light mr-2"}>
                            {title}:
                        </span> 
                        {content}
                    </p>
                </div>
            </Link>
        </>
    );
}

export default Tip;