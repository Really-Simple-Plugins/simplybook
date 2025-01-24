import {forwardRef, useEffect, useState} from "react";
import TextField from "./TextField";
import useServicesData from "../../hooks/useServicesData";
import {__, sprintf } from "@wordpress/i18n";
import ListItem from "./ListItem";
/**
 * HiddenField component
 * @param {object} setting
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const ListField = forwardRef(
    ({ setting, field, fieldState, label, help, context, className, ...props }, ref) => {
        const {services} = useServicesData();
        const [listArray, setListArray] = useState([]);
        const sourceData = {
            services: services,
        };

        useEffect(() => {
            setListArray(sourceData[setting.source]);
        }, [sourceData[setting.source]]);

        if ( !listArray ) {
            return (
                <>{__("Loading, please wait a few seconds...")}</>
            );
        }

        console.log('listArray for ', setting.source , listArray );
        if ( !Array.isArray(listArray) ) {
            return (
                <>{sprintf(__("No items found for %s"), setting.label)}</>
            );
        }

        const premiumItem = {
            id: "upgrade",
            name: __("Want more services?"),
            picture_preview: "",
        };

        return (
            <div className="w-full">
                {listArray.map((item) => (
                    <ListItem upgrade={false} key={item.id} label={label} link={setting.link} item={item} />
                ))}
                <ListItem upgrade={true} label={label} link="r/payment-widget" item={premiumItem} />

            </div>
        );
    },
);

ListField.displayName = 'ListField';
export default ListField;
