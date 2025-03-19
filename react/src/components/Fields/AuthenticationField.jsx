import { forwardRef } from "react";
import TextInput from "../Inputs/TextInput";
import FieldWrapper from "../Forms/FieldWrapper";
import ButtonField from "./ButtonField";
import { __ } from "@wordpress/i18n";
import request from "../../api/requests/request";

/**
 * AuthenticationField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const AuthenticationField = forwardRef(
    ({ setting, fieldState, label, help, context, className, ...props }, ref) => {
        const inputId = setting.id;

        const handleLogoutClick = async (e) => {
            e.preventDefault();

            const confirmed = window.confirm(__("Are you sure you want to logout?", "simplybook"));
            if (!confirmed) {
                return;
            }

            const response = await request("logout");
            console.log(response);
            if (!response) {
                return console.error("Logout failed");
            }

            window.location.href = "/wp-admin/admin.php?page=simplybook";
        };

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
                <TextInput
                    id={inputId}
                    type="text"
                    aria-invalid={!!fieldState?.error?.message}
                    {...props}
                />
                <ButtonField
                    id={inputId}
                    type="button"
                    aria-invalid={!!fieldState?.error?.message}
                    label={__("Log out", "simplybook")}
                    onClick={handleLogoutClick}
                />
            </FieldWrapper>
        );
    },
);

AuthenticationField.displayName = "AuthenticationField";
export default AuthenticationField;