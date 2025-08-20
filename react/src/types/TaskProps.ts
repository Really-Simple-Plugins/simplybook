import { Task } from "./Task";

export interface TaskProps {
    task: Task;
    onDismissCallback: (taskId: string) => void;
    className?: string;
    onModalOpen: (taskModalId: string) => void;
}