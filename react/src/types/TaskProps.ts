import { Task } from "./Task";
import { TaskModal } from "./TaskModal";

export interface TaskProps {
    task: Task;
    onDismissCallback: (taskId: string) => void;
    className?: string;
    onModalOpen: (taskModal: TaskModal | undefined) => void
}