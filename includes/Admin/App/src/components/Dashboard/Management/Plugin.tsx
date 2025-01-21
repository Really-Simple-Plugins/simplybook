import React, {Fragment, useEffect, useState, FC} from "react";
import useManagementData from "../../../hooks/useManagementData";
import { __ } from "@wordpress/i18n";
import LoginLink from "../../Common/LoginLink";
interface PluginProps {
    title: string;
    link: string;
    key:string,
}
const Plugin: FC<PluginProps> = ({ title, link, key }) => {
    const {isPluginActive, plugins = [], refetchData} = useManagementData();
    const [active, setActive] = useState(true);

    useEffect(() => {
        setActive(isPluginActive(key));
    }, [isPluginActive, key]);


    useEffect(() => {
        if (plugins.length===0) {
            refetchData();
        }
    }, [plugins]);

    if ( active ) {
        return null;
    }

    return (
        <>
            <div className={"grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 odd:bg-white even:bg-gray-50"}>
                <div className={"text-sm"}>{title}</div>
                <div className={"flex justify-end"}>
                    <LoginLink btnVariant={"tertiary"} className="py-0 px-2 text-xs" isButton={true} page={link}>{__("Upgrade", "simplybook")}</LoginLink>
                </div>
            </div>
        </>
    )
}
export default Plugin;