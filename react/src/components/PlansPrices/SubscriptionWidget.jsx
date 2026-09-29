import { __ } from "@wordpress/i18n";
import useSubscriptionWidget from "../../hooks/useSubscriptionWidget";
import Error from "../Errors/Error";
import LoginLink from "../Common/LoginLink";
import Icon from "../Common/Icon";

const SubscriptionWidget = () => {
    const { containerId, containerKey, loadError, retry, isLoading } = useSubscriptionWidget();

    return (
        <div className="mx-auto flex max-w-screen-2xl w-full">
            <div className="my-4 w-full min-h-[640px] bg-white p-6">
                {isLoading && (
                    <div className="flex min-h-[640px] items-center justify-center">
                        <Icon name="spinner" size="2x" color="var(--bg-primary)" />
                    </div>
                )}
                {loadError && !isLoading && (
                    <Error
                        errorHeading={__("Something went wrong", "simplybook")}
                        error={true} // Just the heading is fine for this error
                        resolve={{
                            callback: retry,
                            label: __("Try again", "simplybook"),
                        }}
                    >
                        <LoginLink
                            page="v2/r/payment-widget"
                            className="mt-2 text-red-500 underline block"
                            iconName="square-arrow-up-right"
                            iconClass="px-2"
                        >
                            {__("Or open Plans & Prices on SimplyBook.me", "simplybook")}
                        </LoginLink>
                    </Error>
                )}
                <div
                    key={containerKey}
                    id={containerId}
                    className={isLoading ? "w-full" : "w-full min-h-[640px]"}
                />
            </div>
        </div>
    );
};

SubscriptionWidget.displayName = "SubscriptionWidget";

export default SubscriptionWidget;
