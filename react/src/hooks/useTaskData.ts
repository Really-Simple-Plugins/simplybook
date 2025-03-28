import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/Task";
import dismissTaskApi from "../api/endpoints/Dashboard/dismissTaskApi";
import { TaskData } from "../types/TaskData";
import HttpClient from "../api/requests/HttpClient";

const useTaskData = () => {
    const queryClient = useQueryClient();

    const route = 'get_tasks';
    const client = new HttpClient(route);

    // Query for fetching tasks
    const { data: response, isLoading, error } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (error !== null) {
        console.error('Error fetching tasks: ', error.message);
    }

    const tasks: Task[] = Array.isArray(response?.data) ? response?.data : [];

    // Mutation for updating task status
    const { mutate: dismissTask } = useMutation({
        mutationFn: async ( taskId:string ): Promise<TaskData> => {
            console.log("dismissing task ", taskId);
            return dismissTaskApi(taskId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
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