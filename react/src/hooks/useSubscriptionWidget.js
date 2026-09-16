import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { __ } from "@wordpress/i18n";
import HttpClient from "../api/requests/HttpClient";

const WIDGET_ROUTE = "subscription_widget_embed_code";
const WIDGET_CONTAINER_ID = "simplybook-subscription-widget";
const WIDGET_SCRIPT_ID = "simplybook-subscription-widget-script";

const getWidgetLoadErrorMessage = () => __("Plans & Prices could not be loaded.", "simplybook");

const useSubscriptionWidget = () => {
    const client = useMemo(() => new HttpClient(WIDGET_ROUTE), []);
    const initialized = useRef(false);
    const [scriptLoaded, setScriptLoaded] = useState(
        typeof window !== "undefined" && typeof window.SbPayWidget === "function"
    );
    const [loadError, setLoadError] = useState("");
    const handleWidgetError = useCallback((message, widgetError) => {
        console.error(message, widgetError);
        setLoadError(getWidgetLoadErrorMessage());
    }, []);

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
        if (!error) {
            return;
        }

        handleWidgetError("Subscription widget configuration failed to load:", error);
    }, [error, handleWidgetError]);

    useEffect(() => {
        if (!widget?.script_url || scriptLoaded) {
            return;
        }

        const script = document.createElement("script");
        script.id = WIDGET_SCRIPT_ID;
        script.src = widget.script_url;
        script.async = true;

        script.onload = () => setScriptLoaded(true);
        script.onerror = (scriptError) => handleWidgetError(
            "Subscription widget script failed to load:",
            scriptError
        );

        document.body.appendChild(script);

        return () => {
            script.onload = null;
            script.onerror = null;
        };
    }, [handleWidgetError, scriptLoaded, widget?.script_url]);

    useEffect(() => {
        if (!widget || !scriptLoaded || initialized.current) {
            return;
        }

        try {
            if (typeof window.SbPayWidget !== "function") {
                throw new Error("SbPayWidget constructor is missing.");
            }

            new window.SbPayWidget(containerId, widget.params || {});
            initialized.current = true;
            setLoadError("");
        } catch (widgetError) {
            handleWidgetError("Subscription widget failed to initialize:", widgetError);
        }
    }, [containerId, handleWidgetError, scriptLoaded, widget]);

    return {
        containerId,
        loadError,
    };
};

export default useSubscriptionWidget;
