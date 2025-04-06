import {forwardRef, useEffect, useState} from "react";
import CheckboxInput from "../Inputs/CheckboxInput";
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
    ({ upgrade, link, item, label, ...props }, ref) => {
        const [visible, setVisible] = useState(!!item?.is_visible || false);
        const onChange = (e) => {
            console.log('onChange', e.target.checked, "for id ", item.id);
            setVisible(e.target.checked);
        };
        const { domain, domainFetched, hasError: domainHasError } = useDomainData();
        const hasPicture = domainFetched && item.picture_preview && item.picture_preview.length > 0;
        const fullLabel = upgrade? ' |  '+sprintf(__("Get unlimited %s", "simplybook"), label.toLowerCase()) : __("Edit", "simplybook");

        return (
            <>
                <div className="w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            {domainFetched && !domainHasError && hasPicture &&
                                <img className="w-15 h-15 max-w-[40px] max-h-[40px]" src={domain + item.picture_preview}  alt={__('Loading', 'simplybook')}/>
                            }
                            {(!domainFetched || domainHasError || !hasPicture) &&
                                <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                    <Icon name="cart"/>
                                </div>
                            }
                        </div>
                        <div className="font-bold">{item.name}</div>
                        {domainFetched && !domainHasError &&
                            <LoginLink page={link}>
                                {fullLabel}
                            </LoginLink>
                        }
                    </div>
                    <div className="flex items-center">

                        <div className="ml-4 relative">
                            {domainFetched && !domainHasError && !upgrade &&
                                <CheckboxInput
                                    label={""}
                                    id={item.id}
                                    checked={visible}
                                    onChange={(e) => onChange(e)}
                                />
                            }
                            {upgrade && <>
                            <ButtonLink
                                className={"bg-primary hover:bg-primary-hover hover:text-primary-dark"}
                                btnVariant={"square-small"}
                                target="_blank"
                                link="https://help.simplybook.me/index.php/Help_Center"
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