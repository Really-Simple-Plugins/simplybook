import React, { useState } from "react";
import Block from "../Blocks/Block";
import BlockHeading from "../Blocks/BlockHeading";
import { __, _n, sprintf } from "@wordpress/i18n";
import BlockFooter from "../Blocks/BlockFooter";
import BlockContent from "../Blocks/BlockContent";
import useTaskData from "../../hooks/useTaskData";
import TaskComponent from "../Tasks/TaskComponent";
import SubscriptionDataListHorizontal from "./Partials/SubscriptionDataListHorizontal";
import TaskModal from "../Modals/TaskModal";

const Progress = () => {
    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskModalId, setTaskModalId] = useState("");
    const {tasks, isLoading, hasError, dismissTask, getRemainingTasks, getCompletionPercentage} = useTaskData();

    const displayedTasks = showAll ? tasks : getRemainingTasks();
    const completionPercentage = getCompletionPercentage();
    const remainingTasks = getRemainingTasks();
    const hasModal = displayedTasks.some((task) => task.action?.modal);

    const onModalOpen = (taskModalId: string) => {
        setTaskModalId(taskModalId);
        setIsModalOpen(true);
    };
    const onModalClose = () => {
        setIsModalOpen(false);
    };

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
        <>
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
                        {displayedTasks.map((task) => (
                            <TaskComponent
                                key={task.id}
                                task={task}
                                onDismissCallback={dismissTask}
                                className={remainingTasks.length > 7 ? "!mr-0" : !showAll ? "mr-2" : ""}
                                onModalOpen={onModalOpen}
                            />
                        ))}
                    </div>
                </BlockContent>

                <BlockFooter className="flex w-full justify-start 2xl:justify-end text-sm text-gray-500 mt-4">
                    <SubscriptionDataListHorizontal target='trial'/>
                </BlockFooter>
            </Block>
            {hasModal && (
                <TaskModal
                    isModalOpen={isModalOpen}
                    taskModalId={taskModalId}
                    onModalClose={onModalClose}
                />
            )}
        </>
    );
};

Progress.displayName = "Progress";

export default Progress;