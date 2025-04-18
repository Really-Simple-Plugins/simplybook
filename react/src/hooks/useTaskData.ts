import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/Task";
import { TaskData } from "../types/TaskData";
import HttpClient from "../api/requests/HttpClient";

const useTaskData = () => {

    const statusPriority = {
        urgent: 0,
        open: 10,
        premium: 20,
        completed: 30,
        dismissed: 40,
    };

    const queryClient = useQueryClient();

    const getTasksRoute = 'get_tasks';
    const dismissTaskRoute = 'dismiss_task';
    const client = new HttpClient();

    /**
     * Fetches tasks from the server using Tanstack Query.
     */
    const { data: response, isLoading, error } = useQuery({
        queryKey: [getTasksRoute],
        queryFn: () => client.setRoute(getTasksRoute).get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    /**
     * Log an error message if the request fails.
     */
    if (error !== null) {
        console.error('Error fetching tasks: ', error.message);
    }

    /**
     * Extract the tasks from the response for easy access. And sort them by
     * priority.
     * @type {Task[]}
     */
    let tasks: Task[] = [];
    if (Array.isArray(response?.data)) {
        tasks = response?.data.map((task: Task) => {
            return {
                ...task,
                priority: (statusPriority[task.status]) ?? 69,
            };
        }).sort((a: Task, b: Task) => a.priority - b.priority);
    }

    /**
     * Handles the mutation for dismissing a task.
     */
    const { mutate: dismissTask } = useMutation({
        mutationFn: async ( taskId:string ): Promise<TaskData> => {
            return client.setRoute(dismissTaskRoute).setPayload({
                'taskId': taskId,
            }).post();
        },
        onSuccess: () => {
            // Do NOT "await" here: this is a fire-and-forget mutation
            queryClient.invalidateQueries({ queryKey: [getTasksRoute] });
        },
        onError: (error: Error) => {
            console.error('Error dismissing task: ', error.message);
        },
    });

    /**
     * Returns the tasks that are not completed or dismissed.
     * @returns {Task[]}
     */
    const getRemainingTasks = () => {
        return tasks.filter((task: Task) =>
            ["open", "urgent", "premium"].includes(task.status),
        );
    };

    /**
     * Calculates the completion percentage of tasks.
     * @returns {number}
     */
    const getCompletionPercentage = () => {
        const total = tasks.length;
        const completed = tasks.filter(
            (task: Task) => task.status === "dismissed" || task.status === "completed",
        ).length;
        const actualPercentage = Math.round((completed / total) * 80);
        return 20 + actualPercentage;
    };

    return {
        tasks,
        isLoading,
        hasError: (error !== null),
        message: (response?.message ?? error?.message),
        dismissTask,
        getRemainingTasks,
        getCompletionPercentage,
    };
};

export default useTaskData;