import React from "react";
import clsx from "clsx";
import { TipsProps } from "../../../types/TipsProps";
import { Link } from "@tanstack/react-router";

const Tip: React.FC<TipsProps> = ({ 
    className,
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
                <div className="tip-inner flex flex-row justify-start items-center text-base  ">
                    <p className="m-0 text-base text-[#333333] border-b-[1px] border-transparent py-1">
                        <span className={"font-bold  border-primary-light mr-2"}>
                            {title}:
                        </span> 
                        {content}
                    </p>
                </div>
            </Link>
        </>
        // <div className={clsx("simplybook-tips-tricks-element", className)}>
        //     <a href={link} target="_blank" rel="noopener noreferrer" title={content}>
        //         <span className={"font-bold mr-2 text-primary pb-2 border-b-2 border-primary-ligth"}>
        //                 {title}:
        //         </span>
        //         <div className={"simplybook-tips-tricks-content text-base text-simplybook-gray font-light mt-2 py-2 "}>
        //             {content}
        //         </div>
        //     </a>
        // </div>
    );
}

export default Tip;