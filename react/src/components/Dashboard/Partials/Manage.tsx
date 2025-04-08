import ButtonLink from "../../Buttons/ButtonLink";
import React from "react";
interface ManageProps {
    title: string;
    link: string;
    buttonText: string;
}
const Manage: React.FC<ManageProps> = ({ title, link, buttonText }) => {
    return (
        <>
            <>
                <div className={"flex justify-between items-center gap-4 p-4 odd:bg-white even:bg-gray-50"}>
                    <div className="text-base">{title}</div>
                    <div className={"flex justify-end"}>
                        <ButtonLink className={"border-primary text-primary"} icon={false} link={link} btnVariant={"ghost"}>{buttonText}</ButtonLink>
                    </div>
                </div>
            </>
        </>
    )
}
export default Manage