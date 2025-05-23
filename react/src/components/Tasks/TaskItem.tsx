import React from "react";
import { Link } from "@tanstack/react-router";
import LoginLink from "../Common/LoginLink";
import TaskStatusPill from "./TaskStatusPill";
import { Task } from "../../types/Task";
import clsx from "clsx";

interface TaskItemProps {
    task: Task;
    dismissTask: (id: string) => void;
    isRemaining: boolean;
    showAll: boolean;
    remainingTasksCount: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
                                               task,
                                               dismissTask,
                                               isRemaining,
                                               showAll,
                                               remainingTasksCount
                                           }) => {
    const renderActionButton = () => {
        if (!task.action) return null;

        const buttonClassName = clsx(
            "text-tertiary hover:text-tertiary/80 underline text-[0.8125rem]",
            (task.type === 'required' || (task.type === 'optional' && task.status !== 'open')) && "mr-8"
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

        return null;
    };

    const renderDismissButton = () => {
        if (task.type !== 'optional' || !['open', 'urgent', 'premium'].includes(task.status)) {
            return null;
        }

        return (
            <button
                onClick={() => dismissTask(task.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center cursor-pointer"
            >
                ×
            </button>
        );
    };

    return (
        <div
            className={clsx(
                remainingTasksCount > 7 ? "!mr-0" : !showAll ? "mr-2" : "",
                "task-item-inner",
                "h-6 flex items-center gap-4 pl-5 pr-1",
                "hover:bg-gray-50",
                "xl:h-auto xl:flex xl:items-center xl:justify-between xl:grid-cols-[130px_1fr_auto_2em] xl:py-1"
            )}
        >
            {/* Status pill */}
            <TaskStatusPill
                status={task.status}
                premium={task.premium}
                special_feature={task.special_feature}
                label={task.label}
            />

            <div className="flex justify-between w-full items-center">
                {/* Task text */}
                <div className={clsx(
                    task.status === 'dismissed' ? 'text-gray-400 line-through' : '',
                    "text-[0.8125rem] w-[70%]"
                )}>
                    {task.text}
                </div>

                <div className="flex items-center justify-end">
                    {/* Action button */}
                    {renderActionButton()}

                    {/* Dismiss button */}
                    <div className="text-right">
                        {renderDismissButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

TaskItem.displayName = "TaskItem";

export default TaskItem;