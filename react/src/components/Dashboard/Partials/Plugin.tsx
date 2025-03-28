import React, {Fragment, useEffect, useState, FC} from "react";
import useSpecialFeaturesData from "../../../hooks/useSpecialFeaturesData";
import { __ } from "@wordpress/i18n";
import LoginLink from "../../Common/LoginLink";
interface PluginProps {
    title: string;
    link: string;
    id:string,
}
const Plugin: FC<PluginProps> = ({ title, link, id }) => {
    const {isPluginActive, plugins = [], refetchData} = useSpecialFeaturesData();
    const [active, setActive] = useState(true);

    useEffect(() => {
        setActive(isPluginActive(id));
    }, [isPluginActive, id]);


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
                    <LoginLink className={""} btnVariant={"tertiary"} size={"sm"} isButton={true} page={link}>{__("Upgrade", "simplybook")}</LoginLink>
                </div>
            </div>
        </>
    )
}
export default Plugin;