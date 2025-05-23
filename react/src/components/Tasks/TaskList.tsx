import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../../types/Task";
import clsx from "clsx";

interface TaskListProps {
    tasks: Task[];
    remainingTasks: Task[];
    dismissTask: (id: string) => void;
    showAll: boolean;
    className?: string;
}

const TaskList: React.FC<TaskListProps> = ({
                                               tasks,
                                               remainingTasks,
                                               dismissTask,
                                               showAll,
                                               className
                                           }) => {
    return (
        <div className={clsx(
            "task-wrapper scroll-container h-[290px] mt-1 grid overflow-y-auto content-start gap-2",
            className
        )}>
            {tasks.map((task: Task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    dismissTask={dismissTask}
                    isRemaining={remainingTasks.some(rt => rt.id === task.id)}
                    showAll={showAll}
                    remainingTasksCount={remainingTasks.length}
                />
            ))}
        </div>
    );
};

TaskList.displayName = "TaskList";

export default TaskList;