import React from "react";
import Modal from '../Common/Modal';
import { TaskModal as TaskModalType } from "../../types/TaskModal";
import clsx from "clsx";

type TaskModalProps = {
    isModalOpen: boolean,
    taskModalContent: TaskModalType | undefined,
    onModalClose: () => void
};

const TaskModal: React.FC<TaskModalProps> = ({ isModalOpen, taskModalContent, onModalClose }) => {

    return (
        <Modal isOpen={isModalOpen} closeButton={true} onClose={onModalClose}>
            <div className="flex flex-row gap-8 mb-3">
                <div className={clsx(
                    taskModalContent?.image ? "sm:max-w-1/2" : "",
                    "flex flex-col gap-3")}>
                    {taskModalContent?.title && (
                        <h2 className="text-xl font-bold text-tertiary">{taskModalContent?.title}</h2>)}
                    {taskModalContent?.content?.sections && (
                        taskModalContent?.content?.sections.map((section) => (
                            <p className="m-0 text-justify sm:text-left">{section}</p>
                        ))
                    )}
                    {taskModalContent?.callsToAction && (
                        <div className={clsx(taskModalContent?.callsToAction.some((cta) => !cta.button) ? "items-start" : "",
                            "flex flex-row gap-4 ")}>
                            {taskModalContent?.callsToAction.map((cta) => (
                                <div className="flex flex-col gap-3 justify-center items-center">
                                    {cta.qr && (<img width="100%" src={cta.qr} alt={cta.button?.text ?? "QR code"}/>)}
                                    {cta.button && (
                                        <a href={cta.button.link} target="_blank">
                                            {cta.button.image ? (
                                                <img src={cta.button.image} width="200px" alt={cta.button.text}/>) : (
                                                <p>{cta.button.text}</p>)}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>)}
                    {taskModalContent?.footer && (
                        <div className="mb-2">
                            <span>{taskModalContent.footer.text ?? ""}
                                {(taskModalContent.footer.link && taskModalContent.footer.linkText) && (
                                    <a href={taskModalContent.footer.link}
                                       target="_blank">{taskModalContent.footer.linkText}</a>
                                )}
                            </span>
                        </div>)}
                </div>
                {taskModalContent?.image && (
                    <div className="hidden sm:flex flex-col gap-3 grow-1">
                        <img className="h-full" src={`${taskModalContent?.image}`} alt="test"/>
                    </div>)}
            </div>
            {taskModalContent?.backgroundImage && (
                <div className="modal-background absolute inset-0 -z-1"
                     style={{...(taskModalContent?.backgroundImage && {background: `no-repeat center/150% url(${taskModalContent?.backgroundImage})`})}}></div>
            )}
        </Modal>
    );
};

TaskModal.displayName = "TaskModal";

export default TaskModal;
