import React, {Fragment} from "react";
import ButtonInput from "../../Inputs/ButtonInput";
import useManagementData from "../../../hooks/useManagementData";
import { useEffect, useState, FC } from "react";
import { __ } from "@wordpress/i18n";
interface PluginProps {
    title: string;
    link: string;
    key:string,
}
const Plugin: FC<PluginProps> = ({ title, link, key }) => {
    const {isPluginActive} = useManagementData();
    const [active, setActive] = useState(true);

    useEffect(() => {
        setActive(isPluginActive(key));
    },[isPluginActive(key)]);

    if ( active ) {
        return null;
    }

    return (
        <>
            <div className={"grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 odd:bg-white even:bg-gray-50"}>
                <div className={"text-sm"}>{title}</div>
                <div className={"flex justify-end"}>
                    <ButtonInput link={{ to: link }} size={"sm"} btnVariant={"tertiary"}>{__("Upgrade", "simplybook")}</ButtonInput>
                </div>
            </div>
        </>
    )
}
export default Plugin;