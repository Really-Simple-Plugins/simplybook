import React, {useState} from "react";
import {__} from "@wordpress/i18n";
import Modal from "../Common/Modal";
import useWidgetData from "../../hooks/useWidgetData";

type PreviewButtonInputProps = {
    btnVariant?: string;
    disabled?: boolean;
    getValues?: () => any;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

const PreviewButtonInput: React.FC<PreviewButtonInputProps> = ({
     className = "",
     btnVariant = "primary-small",
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
                className={"flex items-center justify-center rounded-full font-bold  text-sm transition-all duration-200 px-3 py-1 bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary cursor-pointer flex-row"} 
                onClick={onClick}
            >
                {__('Preview', 'simplybook')}   
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div id="modal-header" className={"leading-none"}>
                    <h2>{__('Preview', 'simplybook')}</h2>
                </div>
                <div id="sbw_z0hg2i_calendar" className={"h-[70vh] overflow-y-scroll my-4"}></div>
            </Modal>
        </>
    );
};

PreviewButtonInput.displayName = 'PreviewButtonInput';

export default PreviewButtonInput;