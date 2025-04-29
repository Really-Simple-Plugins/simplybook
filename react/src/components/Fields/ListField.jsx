import {forwardRef, useEffect, useState} from "react";
import useServicesData from "../../hooks/useServicesData";
import {__, sprintf } from "@wordpress/i18n";
import ListItem from "./ListItem";
import useProviderData from "../../hooks/useProviderData";
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
        const {services, servicesFetched} = useServicesData();
        const {providers, providersFetched} = useProviderData();
        const [listArray, setListArray] = useState([]);
        const [listFetched, setListFetched] = useState(false);

        const sourceData = {
            services: {
                fetched: servicesFetched,
                data: services,
            },
            providers: {
                fetched: providersFetched,
                data: providers,
            },
        };


        useEffect(() => {
            setListArray(sourceData[setting.source]?.data);
            setListFetched(sourceData[setting.source]?.fetched);

        }, [sourceData[setting.source]]);

        const getEditLink = (id) => {
            return (setting?.edit_link?.replace('{ID}', id) ?? setting.link);
        }

        if (listFetched && !Array.isArray(listArray)) {
            return (
                <>{sprintf(__("No %s found."), setting.label.toLowerCase())}</>
            );
        }

        const premiumItem = {
            id: "upgrade",
            name: (setting?.premiumText ?? ''),
            picture_preview: "",
        };

        return (
            <div className="w-full">
                {!listFetched && (
                    <p className="mb-4">{sprintf(__("Loading %s..."), setting.label.toLowerCase())}</p>
                )}

                {listFetched && listArray.map((item) => (
                    <ListItem upgrade={false} key={item.id+item.source} label={label} link={getEditLink(item.id)} item={item} />
                ))}
                {setting.premiumText && (
                    <ListItem upgrade={true} label={label} link="v2/r/payment-widget" item={premiumItem} />
                )}
            </div>
        );
    },
);

ListField.displayName = 'ListField';
export default ListField;