import React from "react";
import { Link } from "@tanstack/react-router";
import LoginLink from "../Common/LoginLink";
import { TaskProps } from "../../types/TaskProps";
import clsx from "clsx";

const TaskComponent: React.FC<TaskProps> = ({ task, onDismissCallback, className, onModalOpen }) => {

    const getStatusStyles = (status: string, premium: boolean, special_feature: boolean): string => {
        if (premium || special_feature) {
            return 'bg-tertiary text-white';
        }

        switch (status) {
            case 'open':
                return 'bg-yellow-400 text-black';
            case 'urgent':
                return 'bg-red-800 text-white';
            case 'completed':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const taskIsDismissable = (): boolean => {
        return task.type === 'optional' && ['open', 'urgent', 'premium'].includes(task.status);
    }

    const renderActionButton = () => {
        if (!task.action) return null;

        const buttonClassName = clsx(
            "text-tertiary hover:text-tertiary/80 underline text-[0.8125rem] text-nowrap",
            !taskIsDismissable() && "mr-8"  // Add margin only when NOT dismissable
        );

        if (task.action.text && task.action.link) {
            return (
                <Link
                    to={task.action.link}
                    target={task.action?.target ?? '_self'}
                    className={buttonClassName}
                >
                    {task.action.text}
                </Link>
            );
        }

        if (task.action.text && task.action.login_link) {
            return (
                <LoginLink
                    page={task.action.login_link}
                    className={buttonClassName}
                >
                    {task.action.text}
                </LoginLink>
            );
        }

        if (task.action.text && task.action.modal) {
            return (
                <button
                    onClick={ ()=>
                        onModalOpen(task.action?.modal)
                    }
                    className={buttonClassName}
                >
                    {task.action.text}
                </button>
            );
        }

        return null;
    };

    const renderDismissButton = () => {
        if (!taskIsDismissable()) {
            return null;
        }

        return (
            <button
                onClick={() => onDismissCallback(task.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center cursor-pointer"
            >
                ×
            </button>
        );
    };

    return (
        <div
            className={clsx(
                className,
                "task-item-inner",
                "h-6 flex items-center gap-4 pl-5 pr-1",
                "hover:bg-gray-50",
                "xl:h-auto xl:flex xl:items-center xl:justify-between xl:grid-cols-[130px_1fr_auto_2em] xl:py-1"
            )}
        >
            <span
                className={clsx(
                    "inline-block w-0 p-2 rounded-[3rem] xl:w-[130px] text-center xl:px-1 xl:py-1.5 xl:rounded-sm text-xs font-medium",
                    getStatusStyles(task.status, task.premium, task.special_feature)
                )}
            >
                <span className="text-xxs hidden xl:block">{task.label}</span>
            </span>

            <div className="flex justify-between w-full items-center">
                <div className={clsx(
                    task.status === 'dismissed' ? 'text-gray-400 line-through' : '',
                    "text-[0.8125rem] w-[70%]"
                )}>
                    {task.text}
                </div>

                <div className="flex items-center justify-end">
                    {renderActionButton()}

                    <div className="text-right">
                        {renderDismissButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

TaskComponent.displayName = "Task";

export default TaskComponent;