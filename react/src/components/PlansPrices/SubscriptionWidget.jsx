import { __ } from "@wordpress/i18n";
import useSubscriptionWidget from "../../hooks/useSubscriptionWidget";
import ButtonInput from "../Inputs/ButtonInput";
import LoginLink from "../Common/LoginLink";

const SubscriptionWidget = () => {
    const { containerId, loadError, retry, isRetrying } = useSubscriptionWidget();

    return (
        <div className="mx-auto flex max-w-screen-2xl w-full">
            <div className="my-4 w-full min-h-[640px] bg-white p-6">
                {loadError && (
                    <div className="mb-4 flex flex-col gap-3">
                        <p className="text-sm text-red-600">
                            {loadError}
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <ButtonInput
                                btnVariant="primary-small"
                                onClick={retry}
                                disabled={isRetrying}
                            >
                                {__("Try again", "simplybook")}
                            </ButtonInput>
                            <LoginLink
                                page="v2/r/payment-widget"
                                className="text-sm underline"
                                iconName="square-arrow-up-right"
                                iconClass="px-2"
                            >
                                {__("Open Plans & Prices on SimplyBook.me", "simplybook")}
                            </LoginLink>
                        </div>
                    </div>
                )}
                <div id={containerId} className="w-full min-h-[640px]" />
            </div>
        </div>
    );
};

SubscriptionWidget.displayName = "SubscriptionWidget";

export default SubscriptionWidget;
