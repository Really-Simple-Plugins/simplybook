import {forwardRef, useState} from "react";
import CheckboxInput from "../Inputs/CheckboxInput";
import {__, sprintf } from "@wordpress/i18n";
import Icon from "../Common/Icon";
import LoginLink from "../Common/LoginLink";
import useLoginData from "../../hooks/useLoginData";
/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */
const ListItem = forwardRef(
    ({ upgrade, link, item, label, ...props }, ref) => {
        const [visible, setVisible] = useState(item.is_visible);
        const onChange = (e) => {
            console.log('onChange', e.target.checked, "for id ", item.id);
            setVisible(e.target.checked);
        };
        const { domain, fetched } = useLoginData();
        const hasPicture = fetched && item.picture_preview && item.picture_preview.length > 0;
        const fullLabel = upgrade? ' |  '+sprintf(__("Get unlimited %s", "simplybook"), label) : __("Edit", "simplybook");
        return (
            <>
                <div className="w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            { hasPicture &&
                                <img className="w-15 h-15 max-w-[40px] max-h-[40px]" src={domain + item.picture_preview}
                                     alt={item.picture_preview} />
                            }
                            {!hasPicture &&
                                <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                    <Icon name="cart"/>
                                </div>
                            }
                        </div>
                        <div className="font-bold">{item.name}</div>
                        <LoginLink page={link}>
                            {fullLabel}
                        </LoginLink>
                    </div>
                    <div className="flex items-center">

                        <div className="ml-4 relative">
                            {!upgrade &&
                                <CheckboxInput
                                    label={""}
                                    id={item.id}
                                    checked={visible}
                                    onChange={onChange}
                                />
                            }
                            {upgrade && <>
                                            <span
                                                className={`inline-block w-[100px] text-center px-3 py-1.5 rounded-md text-xs font-medium bg-tertiary text-white`}>
                                              {__("Upgrade", "simplybook")}
                                            </span>
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
