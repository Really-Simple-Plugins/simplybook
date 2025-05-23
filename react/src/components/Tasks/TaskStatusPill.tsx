import React from "react";
import clsx from "clsx";

interface TaskStatusPillProps {
    status: string;
    premium: boolean;
    special_feature: boolean;
    label: string;
    className?: string;
}

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

const TaskStatusPill: React.FC<TaskStatusPillProps> = ({
                                                           status,
                                                           premium,
                                                           special_feature,
                                                           label,
                                                           className
                                                       }) => {
    return (
        <span
            className={clsx(
                "inline-block w-0 p-2 rounded-[3rem] xl:w-[130px] text-center xl:px-1 xl:py-1.5 xl:rounded-sm text-xs font-medium",
                getStatusStyles(status, premium, special_feature),
                className
            )}
        >
            <span className="text-xxs hidden xl:block">{label}</span>
        </span>
    );
};

TaskStatusPill.displayName = "TaskStatusPill";

export default TaskStatusPill;