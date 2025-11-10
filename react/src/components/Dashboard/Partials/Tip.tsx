import React from "react";
import { TipsProps } from "../../../types/TipsProps";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Tip: React.FC<TipsProps> = ({
    link,
    content
}) => {
    return (
        <Link
            className="group flex items-center gap-2 transition-colors duration-300 ease-in-out text-black hover:text-primary hover:[&>svg]:text-primary no-underline min-w-0"
            target="_blank"
            to={link}
            title={content}
        >
            <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4 text-neutral-200 transition-colors duration-300 ease-in-out"/>
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline">
                {content}
            </span>
        </Link>
    );
}

export default Tip;