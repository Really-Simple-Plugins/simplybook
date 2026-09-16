import useSubscriptionWidget from "../../hooks/useSubscriptionWidget";

const SubscriptionWidget = () => {
    const { containerId, loadError } = useSubscriptionWidget();

    return (
        <div className="mx-auto flex max-w-screen-2xl w-full">
            <div className="my-4 w-full min-h-[640px] bg-white p-6">
                {loadError && (
                    <p className="text-sm text-red-600">
                        {loadError}
                    </p>
                )}
                <div id={containerId} className="w-full min-h-[640px]" />
            </div>
        </div>
    );
};

SubscriptionWidget.displayName = "SubscriptionWidget";

export default SubscriptionWidget;
