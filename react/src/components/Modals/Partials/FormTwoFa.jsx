import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../Fields/TextField";
import ButtonInput from "../../Inputs/ButtonInput";

const FormTwoFa = ({
    onClose,
    parseTwoFaProviders
}) => {
    /**
     * Initialise constants
     */
    const [twoFaProviders, setTwoFaProviders] = useState({ga: __("Google Authenticator", "simplybook")});
    const [twoFaCode, setTwoFaCode] = useState("");
    const [selectedProvider, setSelectedProvider] = useState(twoFaProviders[0]);

    /**
     * Create a useForm instance for the 2FA field
     */
    const {
        control: control2fa,
        handleSubmit: handleSubmit2fa,
        watch: watch2fa,
        formState: { errors: errors2fa },
    } = useForm({
        mode: "onChange",
        defaultValues: {
        two_fa_code: "",
        two_fa_type: twoFaProviders[0],
        },
    });

  /**
   * Watch the 2FA fields
   */
  const watch2faFields = watch2fa(["two_fa_code"]);

  /**
   * Check 2FA fields
   */
  const is2faFilled = watch2faFields.every( (field) => field && field.trim() !== "", );

  /**
   * Set the 2FA button disabled state
   */
  const setDisabled2FA = !is2faFilled ? true : false;

  const handle2faSubmit = handleSubmit2fa(async (data) => {
    // BUG getting 2fa error and not succesful with the 2fa
    // API Error at simplybook/v1/onboarding/auth_two_fa?&token=a9lhs: 2fa Authentication failed with code 400
    const response = await request("onboarding/auth_two_fa", "POST", {
      auth_session_id: authSessionId,
      company_login: companyLogin,
      user_login: userLogin,
      domain: domain,
      two_fa_code: data.two_fa_code,
      two_fa_type: data.two_fa_type,
    });

    if (response) {
      console.log("2FA successful:", response);
      window.location.href = "/wp-admin/admin.php?page=simplybook";
      return;
    }
  });

  const requestSms = async () => {
    const response = await request("onboarding/auth_send_sms", "POST", {
      auth_session_id: authSessionId,
      company_login: companyLogin,
      domain: domain,
    });
    if (response) {
      return console.log("SMS request successful:", response);
    }
    console.error("SMS request error:", error);
  };

  return (
    <>
        <form className="flex flex-col" onSubmit={handle2faSubmit}>
            {twoFaProviders.length > 1 ? (
                <Controller
                name="two_fa_type"
                control={control2fa}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <SelectField
                    {...field}
                    fieldState={fieldState}
                    label={__("Select 2FA provider", "simplybook")}
                    setting="two_fa_type"
                    options={selectedProvider}
                    value={selectedProvider}
                    onChange={(e) => {
                        handleProviderChange(e);
                        field.onChange(e);
                    }}
                    />
                )}
                />
        ) : (
            <input type={"hidden"} name={"two_fa_type"} value={twoFaProviders} />
        )}
            <div className={"two_fa_type_wrapper flex flex-col"}>
                    <Controller
                        name="two_fa_code"
                        control={control2fa}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <TextField
                            {...field}
                            fieldState={fieldState}
                            className="mb-4"
                            label={__("Enter 2FA authentication code", "simplybook")}
                            setting="two_fa_code"
                            type="text"
                            placeholder={__("Enter code", "simplybook")}
                            value={twoFaCode}
                            onChange={(e) => {
                                setTwoFaCode(e.target.value);
                                field.onChange(e);
                            }}
                            />
                        )}
                    />
                {selectedProvider === "sms" && (
                <button type="button" onClick={requestSms}>
                    {__("Request SMS", "simplybook")}
                </button>
                )}
                <div className={"two_fa_button_wrapper flex flex-col"}>
                    <ButtonInput 
                        className="mt-4 mb-4"
                        btnVariant="primary"
                        type="submit"
                        disabled={setDisabled2FA}
                    >
                        {__("Submit", "simplybook")}
                    </ButtonInput>
                    <ButtonInput 
                        className=""
                        btnVariant="secondary"
                        type="submit"
                        onClick={onClose}
                    >
                        {__("Close", "simplybook")}
                    </ButtonInput>
                </div>
            </div>
        </form>
    </>
  );
};

export default FormTwoFa;
