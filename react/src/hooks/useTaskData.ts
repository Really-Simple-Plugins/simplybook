import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/Task";
import { TaskData } from "../types/TaskData";
import HttpClient from "../api/requests/HttpClient";
import useOnboardingData from "./useOnboardingData";

const useTaskData = () => {

    const statusPriority = {
        urgent: 0,
        upgrade: 5,
        open: 10,
        completed: 20,
        dismissed: 30,
        hidden: 40,
    };

    const queryClient = useQueryClient();
    const { onboardingCompleted } = useOnboardingData();

    const getTasksRoute = 'get_tasks';
    const dismissTaskRoute = 'dismiss_task';
    const snoozeTaskRoute = 'snooze_task';
    const client = new HttpClient();

    /**
     * Fetches tasks from the server using Tanstack Query.
     */
    const { data: response, isLoading, error } = useQuery({
        queryKey: [getTasksRoute],
        queryFn: () => client.setRoute(getTasksRoute).get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        enabled: !!onboardingCompleted,
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
            let priority = (statusPriority[task.status]) ?? 69;
            if (task.premium || task.special_feature) {
                priority = 15;
            }

            return {
                ...task,
                priority: priority,
            };
        }).sort((a: Task, b: Task) => a.priority - b.priority);

        // Just to be sure we do this here too, but they shouldn't be in the
        // response anyway.
        tasks = tasks.filter((task: Task) => task.status !== "hidden");
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
     * Handles the mutation for snoozing a task (temporarily hiding it).
     */
    const { mutate: snoozeTask } = useMutation({
        mutationFn: async ( taskId:string ): Promise<TaskData> => {
            return client.setRoute(snoozeTaskRoute).setPayload({
                'taskId': taskId,
            }).post();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [getTasksRoute] });
        },
        onError: (error: Error) => {
            console.error('Error snoozing task: ', error.message);
        },
    });

    /**
     * Returns the tasks that are not completed or dismissed.
     * @returns {Task[]}
     */
    const getRemainingTasks = () => {
        return tasks.filter((task: Task) =>
            ["open", "upgrade", "urgent"].includes(task.status),
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

        return Math.round((completed / total) * 100);
    };

    return {
        tasks,
        isLoading,
        hasError: (error !== null),
        message: (response?.message ?? error?.message),
        dismissTask,
        snoozeTask,
        getRemainingTasks,
        getCompletionPercentage,
    };
};

export default useTaskData;