import React from "react";
import ModalBackground from "../Partials/ModalBackground";
import { __ } from "@wordpress/i18n";

const InstallAppTaskModalContent = () => {
    // @ts-ignore
    const assetsUrl = simplybook.assets_url;

    return (
        <>
            <div className="flex flex-row gap-8 mb-3 justify-between">
                <div className="flex flex-col gap-6 sm:max-w-1/2 min-h-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold m-0">
                            {__("Manage your bookings on the go with the Admin App!", "simplybook")}
                        </h3>
                    </div>
                    <div className="text-justify sm:text-start">
                        <div className="text-sm mb-2">
                            {__("See new and upcoming bookings, access & contact your clients, send payment links (coming soon) & more with the Admin App.", "simplybook")}
                        </div>
                        <div className="text-sm mb-2">
                            {__("Just scan one of these codes:", "simplybook")}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="sm:max-w-[80%] lg:max-w-[70%]">
                            <img src={assetsUrl + "img/Combined-QR-Codes.svg"} alt={__("Two QR Codes - left to the App Store and right to the Google Play Store pages of the Admin App", "simplybook")}/>
                        </div>
                        <div className="flex flex-row gap-3 justify-around items-center w-full sm:max-w-[80%] lg:max-w-[70%]">
                            <a href="https://apps.apple.com/us/app/simplybook-me-admin/id1498910745" target="_blank">
                                <img src={assetsUrl + "img/App-Store-Btn.svg"} alt={__("Download on the App Store", "simplybook")}/>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=me.simplybook.flutter_simplybook" target="_blank">
                                <img src={assetsUrl + "img/Google-Play-Btn.svg"} alt={__("Get it on Google Play", "simplybook")}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex flex-col gap-3 justify-center w-full min-h-full sm:max-w-1/2">
                    <img src={assetsUrl + "img/QR-MODAL-PHONES.svg"} alt={__("Two phones displaying pages of the Admin App", "simplybook")}/>
                </div>
            </div>
            <ModalBackground image={assetsUrl + "img/QR-MODAL-BG.svg"}/>
        </>
    );
};

InstallAppTaskModalContent.displayName = "InstallAppTaskModalContent";

export default InstallAppTaskModalContent;