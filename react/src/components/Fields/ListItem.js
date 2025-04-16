import {forwardRef, useEffect, useState} from "react";
import CheckboxInput from "../Inputs/CheckboxInput";
import clsx from "clsx";
import {__, sprintf } from "@wordpress/i18n";
import Icon from "../Common/Icon";
import LoginLink from "../Common/LoginLink";
import useDomainData from "../../hooks/useDomainData";
import ButtonLink from "../Buttons/ButtonLink";
/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */
const ListItem = forwardRef(
    ({ 
        upgrade, 
        link, 
        item, 
        label, 
        ...props 
    }, ref) => {

        const [visible, setVisible] = useState(!!item?.is_visible || false);
        const onChange = (e) => {
            console.log('onChange', e.target.checked, "for id ", item.id);
            setVisible(e.target.checked);
        };
        const { domain, domainFetched, hasError: domainHasError } = useDomainData();
        const hasPicture = domainFetched && item.picture_preview && item.picture_preview.length > 0;
        const fullLabel = upgrade ? ' |  '+sprintf(__("Get unlimited %s", "simplybook"), label.toLowerCase()) : __("Edit", "simplybook");

        return (
            <>
                <div className="w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4">
                    <div className={clsx(upgrade ? "justify-start" : "justify-between", "flex flex-row items-center w-full space-x-3 text-base")} >
                        <div className={clsx("flex items-center")}>
                            {domainFetched && !domainHasError && hasPicture &&
                                <img className="w-20 h-20 max-w-[48px] max-h-[48px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-md" src={domain + item.picture_preview}  alt={__('Loading', 'simplybook')}/>
                            }
                            {domainFetched && !domainHasError &&!hasPicture &&                            
                                <div className="w-20 h-20 max-w-[48px] max-h-[48px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-md font-bold">
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                            }
                            <div className="font-bold ml-4">
                                {item.name}
                            </div>
                        </div>
                        {upgrade &&(
                            <p>
                                {fullLabel}
                            </p>
                        )}
                        {!upgrade && domainFetched && !domainHasError &&
                            <LoginLink
                                icon={true}
                                iconName="square-arrow-up-right"
                                iconClass="px-2"
                                className={"text-black flex items-center"} 
                                page={link}
                            >
                                {fullLabel}
                            </LoginLink>
                        }
                    </div>
                    <div className="flex items-center flex-grow">
                        <div className="relative">
                            {upgrade && <>
                                <ButtonLink
                                    className={"bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary"}
                                    btnVariant={"square-small"}
                                    target="_blank"
                                    loginLink="v2/r/payment-widget"
                                >    
                                    {__("Upgrade", "simplybook")}
                                </ButtonLink>
                            </>}
                        </div>
                    </div>
                </div>

            </>
        );
    },
);

ListItem.displayName = 'ListItem';
export default ListItem;