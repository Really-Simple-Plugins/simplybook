import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import Header from "../components/Common/Header.jsx";
import SubscriptionWidget from "../components/PlansPrices/SubscriptionWidget";

export const Route = createLazyFileRoute("/plans-prices")({
    component: PlansPrices,
});

function PlansPrices() {
    return (
        <>
            <Header />
            <div className="mx-auto flex max-w-screen-2xl w-full">
                <div className="mt-4 w-full bg-white p-6">
                    <h2 className="text-lg font-bold mb-2">{__("SimplyBook.me is free to use", "simplybook")}</h2>
                    <p className="text-base">{__("The Free plan gives you up to 50 bookings per month and one Special Feature. Select the Free plan below to continue for free, or choose a paid plan for more bookings and Special Features.", "simplybook")}</p>
                </div>
            </div>
            <SubscriptionWidget />
        </>
    );
}
