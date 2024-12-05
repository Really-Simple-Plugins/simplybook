import { forwardRef, useEffect, useState } from "react";
import FieldWrapper from "../Forms/FieldWrapper";
import SelectInput from "../Inputs/SelectInput";
import getServices from "../../api/endpoints/getServices";
/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const ServicesField = forwardRef(
    ({ field, fieldState, label, help, context, className, ...props }, ref) => {
        const inputId = props.id || field.name;
        const [services, setServices] = useState([]);
        const loadServices = async () => {
            const services = await getServices();
            console.log("loaded services", services);
            setServices(services);
        }
        useEffect(() => {
            if (services.length === 0) {
                loadServices();
            }
        }, []);
        return (
            <FieldWrapper
                label={label}
                help={help}
                error={fieldState?.error?.message}
                context={context}
                className={className}
                inputId={inputId}
                required={props.required}
            >
                <SelectInput
                    id={inputId}
                    options={services}
                    aria-invalid={!!fieldState?.error?.message}
                    {...field}
                    {...props}
                />
            </FieldWrapper>
        );
    },
);

ServicesField.displayName = "ServicesField";
export default ServicesField;
