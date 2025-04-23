import React, { useEffect } from "react";
import {__} from "@wordpress/i18n";
import ButtonLink from "../Buttons/ButtonLink";

type ModalProps = {
    title?: string,
    closeButton?: string,
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, closeButton, isOpen, onClose, children }) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).id === "modal-overlay") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleOutsideClick);
            document.body.classList.add("overflow-hidden");
        } else {
            document.removeEventListener("click", handleOutsideClick);
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-99999">
            <div id="modal-overlay" className="modal-background bg-black/50 cursor-pointer inset-0 absolute"></div>
            <div id="modal-body" className="bg-white p-6 rounded shadow-lg z-60 cursor-default relative w-[50vw] h-auto overflow-y-scroll">
                {title && (
                    <div id="modal-header" className={"leading-none"}>
                        <h2>{title}</h2>
                    </div>
                )}
                {children}
                <div id="modal-footer">
                    <ButtonLink
                        className="bg-secondary hover:bg-secondary-dark text-white w-20"
                        btnVariant="square-small"
                        onClick={onClose}
                    >
                        {closeButton || __('Close', 'simplybook')}
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
};

export default Modal;