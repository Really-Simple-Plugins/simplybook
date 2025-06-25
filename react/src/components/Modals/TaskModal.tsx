import React from "react";
import Modal from '../Common/Modal';
import { TaskModal as TaskModalType } from "../../types/TaskModal";
import clsx from "clsx";

type TaskModalProps = {
    isModalOpen: boolean,
    taskModalContent: TaskModalType | undefined,
    onModalClose: ()=> void};

const TaskModal: React.FC<TaskModalProps> = ({ isModalOpen, taskModalContent, onModalClose }) => {

    return (
        <Modal isOpen={isModalOpen} closeButton={false} onClose={onModalClose}>
            <div className="flex flex-row gap-4">
                <div className={clsx(
                    taskModalContent?.image ? "sm:max-w-2/3" : "",
                    "flex flex-col gap-3")}>
                    {taskModalContent?.title && (
                        <h2>{taskModalContent?.title}</h2>)}
                    {taskModalContent?.content && (
                        <p>{taskModalContent?.content}</p>)}
                    {taskModalContent?.buttons && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            {taskModalContent?.buttons.map((button) => (
                                <div className="flex flex-col gap-3"><img src={button.qr} alt=""/><a href={button.link} target="_blank"><img src={button.image} width="200px" alt=""/></a></div>
                            ))}
                        </div>)}
                    {taskModalContent?.footer && (
                        <span>{taskModalContent.footer.text}<a href={taskModalContent.footer.link} target="_blank">{taskModalContent.footer.linkText}</a></span>)}
                </div>
                {taskModalContent?.image && (
                    <div className="hidden sm:flex flex-col gap-3">
                        <img className="h-full" src={`${taskModalContent?.image}`} alt="test"/>
                    </div>)}
            </div>
        </Modal>
    )
}

TaskModal.displayName = "TaskModal";

export default TaskModal;
