import React, { useEffect, useState } from "react";
import { __ } from '@wordpress/i18n';
import clsx from "clsx";
import { useCrudContext } from "../../../context/CrudContext";
import Provider from "../../../types/Provider";
import ButtonLink from "../../Buttons/ButtonLink";
// import IntlTelInput from "intl-tel-input/reactWithUtils";
// import "intl-tel-input/styles";

type ProviderFormProps = {
    provider: Provider,
    providerId: Provider['id'],
}

const ProviderForm: React.FC<ProviderFormProps> = ({ providerId, provider }) => {
    if (!provider) {
        return <div className="text-gray-500">Loading...</div>;
    }
    const { crudState, dispatch } = useCrudContext();
    const [currentProviderState, setCurrentProviderState] = useState<Provider>(provider);

    useEffect(() => {
        const providerInUnsavedList = crudState.unsavedProviders?.find((providerToTest) => providerToTest.id === providerId);
        setCurrentProviderState(providerInUnsavedList ?? provider);
    }, []);


    useEffect(() => {
        const errorsForThisProvider = crudState.providerErrors ? crudState.providerErrors[providerId] : null;
        if (errorsForThisProvider && !crudState.providersHasUnsavedChanges) {
            dispatch({ dispatchType: 'clearAllErrorsForItem', change: { item: { id: providerId } } });
        }
    }, [crudState.providerErrors, crudState.providersHasUnsavedChanges]);

    const handleInputChange = (field: string, value: string | number) => {
        const changesToUpdate = { id: providerId, [field]: field === 'qty' && value !== '' ? Number(value) : value };
        const errorsForThisProvider = crudState.providerErrors ? crudState.providerErrors[providerId] : {};
        const fieldHasErrors = errorsForThisProvider ? Object.keys(errorsForThisProvider).includes(field) : false;
        if (fieldHasErrors) {
            dispatch({ dispatchType: 'clearErrorsForField', change: { item: { id: providerId, [field]: '' } } });
        }
        if (crudState.generalError) {
            dispatch({ dispatchType: 'generalError', change: { generalError: '' } });
        }
        setCurrentProviderState((prevState) => ({...prevState, ...changesToUpdate}));
        dispatch({ dispatchType: 'unsavedChangesToProviders', change: { item: changesToUpdate } });
    };

    const validateValue = (field: string, value: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^((\(\+|00\))|(\+|00))[1-9][0-9 \-\(\)\.]{7,32}$/;

        let isValueValid = false;
        let errorMessage;

        switch (field) {
            case 'name': {
                isValueValid = value !== '';
                errorMessage = [__('Name is a required field.', 'simplybook')];
                break;
            }
            case 'email': {
                isValueValid = emailPattern.test(value) || value === '';
                errorMessage = [__('Please enter a valid email address (e.g., example@domain.com)', 'simplybook')];
                break;
            }
            case 'phone': {
                isValueValid = phonePattern.test(value) || value === '';
                errorMessage = [__('Please enter a valid phone number with country code (e.g., +31 123 456 789)', 'simplybook')];
                break;
            }
            case 'qty': {
                const valueToNumber = Number(value);
                isValueValid = !isNaN(valueToNumber) && !(valueToNumber > 99 || valueToNumber === 0);
                if (!(valueToNumber > 99)) {
                    errorMessage = [__('Please enter a valid number between 1 and 99', 'simplybook')];
                }
                break;
            }
        }

        if (!isValueValid && errorMessage) {
            const errors = { [field]: errorMessage };
            dispatch({ dispatchType: 'errorsOnFields', change: { providerErrors: { [providerId]: { ...errors } } } });
        } else if (crudState.providerErrors && crudState.providerErrors[providerId]) {
            dispatch({ dispatchType: 'clearErrorsForField', change: { item: { id: providerId, [field]: '' } } });
        }
        return isValueValid;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <label className="cursor-pointer pb-1 font-medium text-black text-label block" htmlFor="provider-name">
                    {__('Service provider name', 'simplybook')} *
                </label>
                <input
                    id="provider-name"
                    type="text"
                    value={currentProviderState.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={clsx(
                        "input-base-no-shadow",
                        crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['name'] && "ring-2 ring-red-600" : null)}
                    required
                    onBlur={(e) => {
                        validateValue('name', e.target.value.trim());
                    }}
                />
                {crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['name'] && (
                    <div>
                        {crudState.providerErrors[providerId]['name'].map((error) => (
                            <span className={"font-medium text-red-600 ml-[1px] block mt-1"}>{error}</span>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="col-span-full">
                <label className="cursor-pointer pb-1 font-medium text-black text-label block" htmlFor="provider-email">
                    {__('E-mail', 'simplybook')}
                </label>
                <input
                    id="provider-email"
                    type="email"
                    value={currentProviderState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => {
                        validateValue('email', e.target.value.trim());
                    }}
                    className={clsx(
                        "input-base-no-shadow",
                        crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['email'] && "ring-2 ring-red-600" : null)}
                />
                {crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['email'] && (
                    <div>
                        {crudState.providerErrors[providerId]['email'].map((error) => (
                            <span className={"font-medium text-red-600 ml-[1px] block mt-1"}>{error}</span>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="col-span-full">
                <label className="cursor-pointer pb-1 font-medium text-black text-label block" htmlFor="provider-phone">
                    {__('Phone', 'simplybook')}
                </label>
                <input
                    id="provider-phone"
                    type="tel"
                    value={currentProviderState.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    pattern="[+]?[0-9\s\-\(\)]{7,20}"
                    title={__('Please enter a valid phone number with country code (e.g., +31 123 456 789)', 'simplybook')}
                    className={clsx(
                        "input-base-no-shadow",
                        crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['phone'] && "ring-2 ring-red-600" : null)}
                    placeholder="+31 123 456 789"
                    onBlur={(e) => {
                        validateValue('phone', e.target.value.trim());
                    }}
                />
                {/*<IntlTelInput*/}
                {/*    onChangeNumber={(e)=> console.log(e)}*/}
                {/*    // onChangeValidity={(e)=> console.log(e)}*/}
                {/*    // onChangeErrorCode={(e)=> console.log(e)}*/}
                {/*    initOptions={{*/}
                {/*        initialCountry: "us",*/}
                {/*    }}*/}
                {/*/>*/}

                {crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['phone'] && (
                    <div>
                        {crudState.providerErrors[providerId]['phone'].map((error) => (
                            <span className={"font-medium text-red-600 ml-[1px] block mt-1"}>{error}</span>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="col-span-full">
                <label className="cursor-pointer pb-1 font-medium text-black text-label block" htmlFor="provider-qty">
                    {__('How many clients can be served at the same time?', 'simplybook')} *
                </label>
                <input
                    id="provider-qty"
                    type="text"
                    pattern="[0-9]"
                    placeholder="1"
                    value={currentProviderState.qty}
                    required
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        const isValid = trimmedValue === '' || validateValue('qty', trimmedValue);
                        if (isValid) {
                            handleInputChange('qty', trimmedValue);
                        }
                        if (trimmedValue === '') {
                            const errors = { qty: [__('Please enter a valid number between 1 and 99', 'simplybook')] };
                            dispatch({
                                dispatchType: 'errorsOnFields',
                                change: { providerErrors: { [providerId]: { ...errors } } }
                            });
                        }
                    }}
                    onBlur={(e) => {
                        validateValue('qty', e.target.value.trim());
                    }}
                    className={clsx(
                        "input-base-no-shadow",
                        crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['qty'] && "ring-2 ring-red-600" : null)}
                />
                {crudState.providerErrors && crudState.providerErrors[providerId] ? crudState.providerErrors[providerId]['qty'] && (
                    <div>
                        {crudState.providerErrors[providerId]['qty'].map((error) => (
                            <span className={"font-medium text-red-600 ml-[1px] block mt-1"}>{error}</span>
                        ))}
                    </div>
                ) : null}
            </div>
            {/* Edit All Properties Button */}
            {providerId && providerId !== "new" && (
                <div className="mt-4 max-w-fit">
                    <ButtonLink
                        className="!border-sb-blue !text-sb-blue flex-row-reverse"
                        icon={true}
                        iconName="target-blank"
                        iconClass="fa-regular"
                        reverseIcon={true}
                        btnVariant="square-ghost-small"
                        loginLink={`/v2/management/#providers/edit/details/${providerId}`}
                    >
                        {__("Edit All Properties", "simplybook")}
                    </ButtonLink>
                </div>
            )}
        </div>
    );
};

export default ProviderForm;