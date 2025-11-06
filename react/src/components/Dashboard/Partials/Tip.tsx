import React from "react";
import { TipsProps } from "../../../types/TipsProps";
import { Link } from "@tanstack/react-router";

const Tip: React.FC<TipsProps> = ({
    link,
    content
}) => {
    return (
        <Link
            className="group flex items-center gap-[10px] text-[rgba(69,69,82,0.9)] transition-colors duration-300 ease-in-out hover:text-primary no-underline min-w-0"
            target="_blank"
            to={link}
            title={content}
        >
            <div className="flex-shrink-0">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-[15px] w-[15px]"
                >
                    <path
                        className="fill-[#ededed] transition-colors duration-300 ease-in-out group-hover:fill-primary"
                        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
                    />
                </svg>
            </div>
            <span className="text-sm leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline">
                {content}
            </span>
        </Link>
    );
}

export default Tip;