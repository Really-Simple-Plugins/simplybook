import { forwardRef } from "react";
import TextInput from "../Inputs/TextInput";
import FieldWrapper from "../Forms/FieldWrapper";
import ButtonField from "./ButtonField";
import { __, sprintf } from "@wordpress/i18n";
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
                sprintf(
                    // Translators: %1$s and %2$s are placeholders for line breaks and bullet points
                    __("Are you sure you want to logout?%1$sAll settings will be lost.%2$sYou need to reset your booking page(s) manually.", "simplybook"),
                    "\n\n- ",
                    "\n- "
                )
            );

            if (!confirmed) {
                return;
            }

            try {
                await client.setPayload({
                    user_confirmed: confirmed,
                }).post();
            } catch (error) {
                console.error("Logout request failed", error);
                return;
            }

            window.location.assign(simplybook.dashboard_url);

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