import { forwardRef } from "react";
import TextInput from "../Inputs/TextInput";
import FieldWrapper from "../Forms/FieldWrapper";
import ButtonField from "./ButtonField";
import { __ } from "@wordpress/i18n";
import HttpClient from "../../api/requests/HttpClient";
import ButtonLink from "../Buttons/ButtonLink";

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

        const client = new HttpClient('logout');

        const handleLogoutClick = async (e) => {
            e.preventDefault();

            const confirmed = window.confirm(
                __("Are you sure you want to logout? All settings will be lost.", "simplybook")
            );
            if (!confirmed) {
                return;
            }

            try {
                await client.post();
            } catch (error) {
                console.error("Logout request failed", error);
                return;
            }

            window.location.href = "/wp-admin/admin.php?page=simplybook-integration";
        };

        return (
            <FieldWrapper
                label={label}
                tooltip={props.tooltip}
                context={context}
                className={className}
                inputId={inputId}
                required={props.required}
            >
                <TextInput
                className="mb-4"
                    id={inputId}
                    type="text"
                    aria-invalid={!!fieldState?.error?.message}
                    {...props}
                />

                <ButtonLink
                    id={inputId}
                    btnVariant="tertiary-small"
                    aria-invalid={!!fieldState?.error?.message}
                    label={__("Log out", "simplybook")}
                    onClick={handleLogoutClick}
                >
                    {__("Log out", "simplybook")}
                </ButtonLink>
            </FieldWrapper>
        );
    },
);

AuthenticationField.displayName = "AuthenticationField";
export default AuthenticationField;