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
                <div className={"grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 odd:bg-white even:bg-gray-50"}>
                    <div className={"text-sm"}>{title}</div>
                    <div className={"flex justify-end"}>
                        <ButtonLink className={""} icon={false} link={link} btnVariant={"tertiary"}>{buttonText}</ButtonLink>
                    </div>
                </div>
            </>
        </>
    )
}
export default Manage