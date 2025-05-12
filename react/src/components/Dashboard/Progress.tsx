import React, {useState} from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import {__, _n, sprintf} from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import useTaskData from "../../hooks/useTaskData";
import {Task} from "../../types/Task";
import SubscriptionDataListHorizontal from "./Partials/SubscriptionDataListHorizontal";
import {Link} from "@tanstack/react-router";
import LoginLink from "../Common/LoginLink";

const getStatusStyles = (status: string, premium: boolean, special_feature: boolean) => {
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
                <div className="px-5 py-3">
                    <div className="w-full bg-gray-200 rounded-md h-5">
                        <div
                            className="bg-yellow-400 h-5 rounded-md transition-all duration-300"
                            style={{width: `${completionPercentage}%`}}
                        />
                    </div>

                </div>
                <div className="grid grid-cols-[130px_1fr_auto_2em] gap-4 items-center px-5 py-3">
        <span className="font-bold text-3xl">
           {completionPercentage}%
          </span>
                    <span className="text-base">
            {remainingTasks.length === 0 && __("You're all set! Great job!", "simplybook")}
                        {remainingTasks.length > 0 && sprintf(_n("You're on your way. You still have %s task open.", "You're on your way. You still have %s tasks open.", remainingTasks.length, "simplybook"), remainingTasks.length)}
          </span>
                </div>

                <div className="grid gap-1 h-[300px] overflow-y-auto">
                    {displayedTasks.map((task: Task) => (
                        <div
                            key={task.id}
                            className="grid grid-cols-[130px_1fr_auto_2em] gap-4 items-center px-5 py-3 hover:bg-gray-50"
                        >
                            {/* Status pill - fixed width */}
                            <span
                                className={`inline-block w-[130px] text-center px-1 py-1.5 rounded-md text-xs font-medium ${getStatusStyles(task.status, task.premium, task.special_feature)}`}>
                                {task.label}
                            </span>

                            {/* Task text */}
                            <div className={task.status === 'dismissed' ? 'text-gray-400 line-through' : ''}>
                                {task.text}
                            </div>

                            {/* Action button */}
                            <div>
                                {task.action && task.action.text && task.action.link && (
                                    <Link
                                        to={task.action.link}
                                        target={task.action?.target ?? '_self'}
                                        className="text-tertiary hover:text-tertiary/80 text-sm underline"
                                    >
                                        {task.action.text}
                                    </Link>
                                )}
                                {task.action && task.action.text && task.action.login_link && (
                                    <LoginLink
                                        page={task.action.login_link}
                                        className="text-tertiary hover:text-tertiary/80 text-sm underline"
                                    >
                                        {task.action.text}
                                    </LoginLink>
                                )}
                            </div>
                            {/* Dismiss button */}
                            <div className="text-right">
                                {task.type === 'optional' && ['open', 'urgent', 'premium'].includes(task.status) && (
                                    <button
                                        onClick={() => dismissTask(task.id)}
                                        className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center cursor-pointer"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </BlockContent>
            <BlockFooter className="flex w-full justify-start 2xl:justify-end text-sm text-gray-500 mt-4">
                <SubscriptionDataListHorizontal/>
            </BlockFooter>
        </Block>
    );
};

Progress.displayName = "Progress";

export default Progress;