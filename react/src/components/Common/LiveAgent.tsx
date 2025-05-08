import { useEffect, useRef } from "react";

const LiveAgent = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // @ts-ignore - typescript does not recognize simplybook as a global
        if (!window.simplybook?.support?.enabled) {
            return;
        }

        if (!containerRef.current) {
            console.error("Parent element not found.");
            return;
        }

        const script = document.createElement("script");
        script.id = "la_x2s6df8d";
        script.defer = true;
        // @ts-ignore - typescript does not recognize simplybook as a global
        script.src = window?.simplybook?.support?.widget?.url;
        script.onload = function () {
            // @ts-ignore
            if (window.LiveAgent) {
                // @ts-ignore
                window.LiveAgent.createButton('0r62zimg', script);
            }
        };

        containerRef.current.appendChild(script);

        return () => {
            // Cleanup: Remove the script when the component is unmounted
            containerRef.current?.removeChild(script);
        };
    }, []);

    return <div ref={containerRef} className={"col-span-12 !bg-transparent shadow-none"}></div>;
};

export default LiveAgent;