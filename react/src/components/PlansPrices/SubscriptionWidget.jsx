import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { __ } from "@wordpress/i18n";
import HttpClient from "../../api/requests/HttpClient";

const WIDGET_ROUTE = "subscription_widget_embed_code";
const WIDGET_CONTAINER_ID = "simplybook-subscription-widget";
const WIDGET_SCRIPT_ID = "simplybook-subscription-widget-script";

const SubscriptionWidget = () => {
    const client = useMemo(() => new HttpClient(WIDGET_ROUTE), []);
    const initialized = useRef(false);
    const [scriptError, setScriptError] = useState("");

    const { error, data: response } = useQuery({
        queryKey: [WIDGET_ROUTE],
        queryFn: () => client.get(),
        staleTime: 0,
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const widget = response?.data ?? null;
    const containerId = widget?.container_id || WIDGET_CONTAINER_ID;

    useEffect(() => {
        if (!widget?.script_url || initialized.current) {
            return;
        }

        const initializeWidget = () => {
            if (initialized.current) {
                return;
            }

            if (typeof window.SbPayWidget !== "function") {
                setScriptError(__("Plans & Prices could not be loaded.", "simplybook"));
                return;
            }

            try {
                new window.SbPayWidget(containerId, widget.params || {});
                initialized.current = true;
                setScriptError("");
            } catch (widgetError) {
                console.error("Subscription widget failed to initialize:", widgetError);
                setScriptError(__("Plans & Prices could not be loaded.", "simplybook"));
            }
        };

        const handleScriptError = () => {
            setScriptError(__("Plans & Prices could not be loaded.", "simplybook"));
        };

        const existingScript = document.getElementById(WIDGET_SCRIPT_ID);
        if (existingScript) {
            if (existingScript.dataset.loaded === "true" || typeof window.SbPayWidget === "function") {
                existingScript.dataset.loaded = "true";
                initializeWidget();
                return;
            }

            existingScript.addEventListener("load", initializeWidget);
            existingScript.addEventListener("error", handleScriptError);

            return () => {
                existingScript.removeEventListener("load", initializeWidget);
                existingScript.removeEventListener("error", handleScriptError);
            };
        }

        const script = document.createElement("script");
        script.id = WIDGET_SCRIPT_ID;
        script.src = widget.script_url;
        script.async = true;
        script.dataset.loaded = "false";

        const handleScriptLoad = () => {
            script.dataset.loaded = "true";
            initializeWidget();
        };

        script.addEventListener("load", handleScriptLoad);
        script.addEventListener("error", handleScriptError);
        document.body.appendChild(script);

        return () => {
            script.removeEventListener("load", handleScriptLoad);
            script.removeEventListener("error", handleScriptError);
        };
    }, [containerId, widget]);

    return (
        <div className="mx-auto flex max-w-screen-2xl w-full">
            <div className="my-4 w-full min-h-[640px] bg-white p-6">
                {error && (
                    <p className="text-sm text-red-600">
                        {__("Plans & Prices could not be loaded.", "simplybook")}
                    </p>
                )}
                {scriptError && (
                    <p className="text-sm text-red-600">
                        {scriptError}
                    </p>
                )}
                <div id={containerId} className="w-full min-h-[640px]" />
            </div>
        </div>
    );
};

SubscriptionWidget.displayName = "SubscriptionWidget";

export default SubscriptionWidget;
