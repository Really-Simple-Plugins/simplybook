import React, {useState} from "react";
import {__} from "@wordpress/i18n";
import Modal from "../Common/Modal";
import useWidgetData from "../../hooks/useWidgetData";

type PreviewButtonInputProps = {
    disabled?: boolean;
    getValues?: () => any;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

const PreviewButtonInput: React.FC<PreviewButtonInputProps> = ({
     className = "",
     getValues,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createPreviewWidget } = useWidgetData();

    let localClassName = "rounded-full transition-all duration-200 p-4 cursor-pointer bg-secondary text-white" +
        " hover:bg-secondary-dark";

    if (className.length > 0) {
        localClassName = localClassName + ' ' + className;
    }

    /**
     * Function to handle button click that opens the modal. In our case it also
     * sends the request to create the preview widget.
     */
    const onClick = () => {
        let formData = []; // Empty creates preview based on database

        if (getValues) {
            formData = getValues();
        }

        // Open before sending request to make sure container exists
        setIsModalOpen(true);

        // @ts-ignore
        createPreviewWidget(formData).then((response) => {

            // Create the script element
            let newScriptElement = document.createElement('script');
            newScriptElement.id = 'simplybook-preview-widget-script';
            newScriptElement.innerHTML = response.data.widget;

            document.head.appendChild(newScriptElement);

            // Dispatch custom element to load the widget
            document.dispatchEvent(
                new CustomEvent('loadSimplyBookPreviewWidget')
            );
        });
    };

    /**
     * Function to close the modal
     */
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={onClick}
                className={localClassName}
            >
                {__('Preview', 'simplybook')}
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={__('Preview', 'simplybook')}
                closeButton={__('Close', 'simplybook')}
            >
                <div id="sbw_z0hg2i_calendar"></div>
            </Modal>
        </>
    );
};

PreviewButtonInput.displayName = 'PreviewButtonInput';

export default PreviewButtonInput;