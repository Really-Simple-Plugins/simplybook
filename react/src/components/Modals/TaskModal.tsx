import React from "react";
import Modal from '../Common/Modal';
import InstallAppTaskModalContent from "./Tasks/InstallAppTaskModalContent"

type TaskModalProps = {
    isModalOpen: boolean,
    taskModalId: string,
    onModalClose: () => void,
};

const TaskModal: React.FC<TaskModalProps> = ({ isModalOpen, taskModalId, onModalClose }) => {
    if (!taskModalId) {
        console.warn("No taskModalId was provided.");
        return null;
    }

    let taskModalContent;

    switch (taskModalId) {
        case "install_app_task":
            taskModalContent = (<InstallAppTaskModalContent />);
            break;
        default:
            console.error("The taskModalId provided is not valid.");
    }

    if(!taskModalContent){
        return null;
    }

    return (
        <Modal isOpen={isModalOpen} closeButton={true} onClose={onModalClose}>
            {taskModalContent}
        </Modal>
    );
};

TaskModal.displayName = "TaskModal";

export default TaskModal;
