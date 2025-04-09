import React from "react";
import clsx from "clsx";
import { TipsProps } from "../../../types/TipsProps";

const Tip: React.FC<TipsProps> = ({ 
    className,
    link, 
    title, 
    content 
}) => { 
    return (
        <div className={clsx("simplybook-tips-tricks-element", className)}>
            <a href={link} target="_blank" rel="noopener noreferrer" title={content}>
                <span className={"font-bold mr-2 text-primary pb-2 border-b-2 border-primary-ligth"}>
                        {title}:
                </span>
                <div className={"simplybook-tips-tricks-content text-base text-simplybook-gray font-light mt-2 py-2 "}>
                    {content}
                </div>
            </a>
        </div>
    );
}

export default Tip;