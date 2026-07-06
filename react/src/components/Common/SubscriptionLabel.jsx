import Label from "./Label";

const SubscriptionLabel = ({ children, labelVariant, link = "" }) => {
    const subscriptionLabel = (
        <Label labelVariant={labelVariant}>
            {children}
        </Label>
    );

    if (!link) {
        return subscriptionLabel;
    }

    return (
        <a href={link} className="no-underline hover:opacity-80 focus:outline-hidden">
            {subscriptionLabel}
        </a>
    );
};

SubscriptionLabel.displayName = "SubscriptionLabel";

export default SubscriptionLabel;
