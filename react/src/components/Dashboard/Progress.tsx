import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __, _n, sprintf } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import useTaskData from "../../hooks/useTaskData";
import LoginLink from "../Common/LoginLink";
import TaskStatusPill from "../Tasks/TaskStatusPill";
import SubscriptionDataListHorizontal from "./Partials/SubscriptionDataListHorizontal";
import { Task } from "../../types/Task";
import clsx from "clsx";

const Progress = () => {
    const [showAll, setShowAll] = useState(false);
    const {tasks, isLoading, hasError, dismissTask, getRemainingTasks, getCompletionPercentage} = useTaskData();

    const displayedTasks = showAll ? tasks : getRemainingTasks();
    const completionPercentage = getCompletionPercentage();
    const remainingTasks = getRemainingTasks();

    let defaultMessage = __("No tasks available.", "simplybook");
    if (isLoading) {
        defaultMessage = __("Loading tasks...", "simplybook");
    }

    const renderActionButton = (task: Task) => {
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

    const renderDismissButton = (task: Task) => {
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

    const renderTaskItem = (task: Task) => {
        const isRemaining = remainingTasks.some(rt => rt.id === task.id);

        return (
            <div
                key={task.id}
                className={clsx(
                    remainingTasks.length > 7 ? "!mr-0" : !showAll ? "mr-2" : "",
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
                        {renderActionButton(task)}

                        {/* Dismiss button */}
                        <div className="text-right">
                            {renderDismissButton(task)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading || hasError) {
        return (
            <Block className="col-span-12 sm:col-span-6 2xl:col-span-6 2xl:row-span-2 xl:col-span-4">
                <BlockHeading title={__("Progress", "simplybook")} controls={undefined}/>
                <BlockContent>
                    <div className="text-center py-8 text-gray-500">
                        <p>{defaultMessage}</p>
                    </div>
                </BlockContent>
            </Block>
        );
    }

    return (
        <Block className="col-span-12 sm:col-span-12 2xl:col-span-6 2xl:row-span-2  xl:col-span-6">
            <BlockHeading
                title={__("Progress", "simplybook")}
                controls={
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowAll(true)}
                            className={`text-sm ${showAll ? 'text-tertiary font-semibold' : 'text-gray-500'}`}
                        >
                            {__("All tasks", "simplybook")} ({tasks.length})
                        </button>
                        <span>|</span>
                        <button
                            onClick={() => setShowAll(false)}
                            className={`text-sm ${!showAll ? 'text-tertiary font-semibold' : 'text-gray-500'}`}
                        >
                            {__("Remaining tasks", "simplybook")} ({remainingTasks.length})
                        </button>
                    </div>
                }
            />
            <BlockContent className="px-0 py-0">
                <div className="px-5">
                    <div className="w-full bg-gray-200 rounded-md h-5">
                        <div
                            className="bg-yellow-400 h-5 rounded-md transition-all duration-300"
                            style={{width: `${completionPercentage}%`}}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-start gap-4 px-5 py-4">
                    <span className="font-bold text-2xl w-min">
                        {completionPercentage}%
                    </span>
                    <span className="text-xl font-medium">
                        {remainingTasks.length === 0 && __("You're all set! Great job!", "simplybook")}
                        {remainingTasks.length > 0 && sprintf(_n("You're on your way. You still have %s task open.", "You're on your way. You still have %s tasks open.", remainingTasks.length, "simplybook"), remainingTasks.length)}
                    </span>
                </div>

                {/* Task List */}
                <div className="task-wrapper scroll-container h-[290px] mt-1 grid overflow-y-auto content-start gap-2">
                    {displayedTasks.map((task: Task) => renderTaskItem(task))}
                </div>
            </BlockContent>

            <BlockFooter className="flex w-full justify-start 2xl:justify-end text-sm text-gray-500 mt-4">
                <SubscriptionDataListHorizontal target='trial'/>
            </BlockFooter>
        </Block>
    );
};

Progress.displayName = "Progress";

export default Progress;