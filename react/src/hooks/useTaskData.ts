import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/Task";
import { TaskData } from "../types/TaskData";
import HttpClient from "../api/requests/HttpClient";

const useTaskData = () => {
    const queryClient = useQueryClient();

    const getTasksRoute = 'get_tasks';
    const dismissTaskRoute = 'dismiss_task';

    const client = new HttpClient();

    // Query for fetching tasks
    const { data: response, isLoading, error } = useQuery({
        queryKey: [getTasksRoute],
        queryFn: () => client.setRoute(getTasksRoute).get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (error !== null) {
        console.error('Error fetching tasks: ', error.message);
    }

    const tasks: Task[] = Array.isArray(response?.data) ? response?.data : [];

    // Mutation for updating task status
    const { mutate: dismissTask } = useMutation({
        mutationFn: async ( taskId:string ): Promise<TaskData> => {
            return client.setRoute(dismissTaskRoute).setPayload({
                'taskId': taskId,
            }).post();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [getTasksRoute] });
        },
        onError: (error: Error) => {
            console.error('Error dismissing task: ', error.message);
        },
    });

    const getRemainingTasks = () => {
        return tasks.filter((task: Task) =>
            ["open", "urgent", "premium"].includes(task.status),
        );
    };

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