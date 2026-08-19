import { createLazyFileRoute } from "@tanstack/react-router";
import Header from "../components/Common/Header.jsx";
import SubscriptionWidget from "../components/PlansPrices/SubscriptionWidget";

export const Route = createLazyFileRoute("/plans-prices")({
    component: PlansPrices,
});

function PlansPrices() {
    return (
        <>
            <Header />
            <SubscriptionWidget />
        </>
    );
}
