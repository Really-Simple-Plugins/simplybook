import { useEffect, useState } from "react";
import {__} from "@wordpress/i18n";

const LiveAgent = (props: { style?: string }) => {
    const [chatButton, setChatButton] = useState<any>(null);

    useEffect(() => {
        // @ts-ignore - TypeScript does not recognize simplybook as a global
        if (!window.simplybook?.support?.enabled) {
            return;
        }

        const script = document.createElement("script");
        script.id = "la_x2s6df8d";
        script.defer = true;
        // @ts-ignore
        script.src = window.simplybook.support.widget.url;

        script.onload = function () {
            // @ts-ignore
            if (window.LiveAgent) {
                // @ts-ignore
                const btn = window.LiveAgent.createButton('0r62zimg', script);
                setChatButton(btn);
            }
        };

        document.head.appendChild(script);
    }, []);

    const handleClick = () => {
        if (chatButton?.onClick) {
            chatButton.onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            className="bg-transparent text-primary text-base font-bold px-3 py-1 rounded border-2 border-primary cursor-pointer text-center"
        >
            {__('Live Help', 'simplybook')}
        </div>
    );
};

export default LiveAgent;