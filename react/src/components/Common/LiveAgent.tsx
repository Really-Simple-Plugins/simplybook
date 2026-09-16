import { useEffect, useState } from "react";
import {__} from "@wordpress/i18n";

const LiveAgent = (props: { style?: string }) => {
    const [chatButton, setChatButton] = useState<LiveAgentButton | null>(null);
    const liveAgentScriptUrl = window.simplybook?.support?.widget?.url;
    const supportEnabled = window.simplybook?.support?.enabled === true && !!liveAgentScriptUrl;

    useEffect(() => {
        if (!supportEnabled || !liveAgentScriptUrl) {
            return;
        }

        const script = document.createElement("script");
        script.id = "la_x2s6df8d";
        script.defer = true;
        script.src = liveAgentScriptUrl;

        script.onload = function () {
            if (window.LiveAgent) {
                const btn = window.LiveAgent.createButton('0r62zimg', script);
                setChatButton(btn);
            }
        };

        document.head.appendChild(script);
    }, [supportEnabled, liveAgentScriptUrl]);

    if (!supportEnabled) {
        return null;
    }

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
