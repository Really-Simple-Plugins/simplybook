import React from "react";
import Modal from '../Common/Modal';
import { TaskModal as TaskModalType } from "../../types/TaskModal";
import clsx from "clsx";

type TaskModalProps = {
    isModalOpen: boolean,
    // taskModalContent: TaskModalType | undefined,
    taskModalContent: any,
    onModalClose: () => void
};

const TaskModal: React.FC<TaskModalProps> = ({ isModalOpen, taskModalContent, onModalClose }) => {
    const cssContentGridTemplateAreas = "'col0-title0 col1-images0'" + "'col0-text0 col1-images0'" + "'col0-text1 col1-images0'" + "'col0-images0 col1-images0'" + "'col0-callsToAction0 col1-images0'";

    return (
        <Modal isOpen={isModalOpen} closeButton={true} onClose={onModalClose}>
            {taskModalContent?.header?.title && (
                <div>
                    {taskModalContent.header.title}
                </div>
            )}
            {taskModalContent?.content && (
                <div className="grid gap-y-4 mb-3 grid-cols-1 sm:grid-cols-2" style={{gridTemplateAreas: cssContentGridTemplateAreas, gridTemplateRows: 'auto'}}>
                    {taskModalContent?.content.map((column: any, columnIndex: number) => (
                        Object.keys(column).map((contentType) => (
                            column[contentType].map((item: any, itemIndex: number) => {
                                const gridAreaName = `col${columnIndex}-${contentType}${itemIndex}`
                                return (
                                    <div style={{gridArea: gridAreaName}} className={clsx(
                                        (contentType === 'images' && (gridAreaName === "col1-images0" ? "hidden sm:flex self-center justify-self-center" : "sm:max-w-[80%] lg:max-w-[70%]")),
                                        (contentType === 'title' && "flex items-center justify-between"),
                                        (contentType === 'text' && "text-sm mb-2"),
                                        (contentType === 'callsToAction' && "flex flex-row gap-3 justify-center items-center w-full sm:max-w-[80%] lg:max-w-[70%]"),
                                    )}>
                                        {contentType === 'title' && (
                                            <h2 className="text-lg font-semibold m-0">{item}</h2>
                                        )}
                                        {contentType === 'text' && (
                                            item
                                        )}
                                        {contentType === 'images' && (
                                            <img src={item.src} alt={item.altText}/>
                                        )}
                                        {contentType === 'callsToAction' && (
                                            item.map((cta: any) => (
                                                cta.button && (
                                                    <a href={cta.button.link} target="_blank">
                                                        {cta.button.image && (
                                                            <img src={cta.button.image} width="200px" alt={cta.button.text ?? "Link to download the Admin App"}/>
                                                        )}
                                                        {(cta.button.text && cta.button.showText) && (
                                                            <p>{cta.button.text}</p>
                                                        )}
                                                    </a>
                                                )
                                            ))
                                        )}
                                    </div>
                                )
                            })
                        )))
                    )}
                </div>
            )}
            {taskModalContent?.background && (
                <div className="modal-background absolute inset-0 -z-1"
                     style={{...(taskModalContent?.background.image && {background: `no-repeat center/150% url(${taskModalContent?.background.image})`})}}>
                </div>
            )}
        </Modal>
    );
};

TaskModal.displayName = "TaskModal";

export default TaskModal;
