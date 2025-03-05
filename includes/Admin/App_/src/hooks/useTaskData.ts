import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/Task";
import getTasks from "../api/endpoints/Dashboard/getTasks";
import dismissTaskApi from "../api/endpoints/Dashboard/dismissTaskApi";
import { TaskData } from "../types/TaskData";

const useTaskData = () => {
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for updating task status
  const { mutate: dismissTask } = useMutation({
    mutationFn: async ( taskId:string ): Promise<TaskData> => {
      console.log("dismissing task ", taskId);
      return dismissTaskApi(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const getRemainingTasks = () => {
    return tasks.filter((task) =>
        ["open", "urgent", "premium"].includes(task.status),
    );
  };

  const getCompletionPercentage = () => {
    const total = tasks.length;
    const completed = tasks.filter(
        (task) => task.status === "dismissed" || task.status === "completed",
    ).length;
    const actualPercentage = Math.round((completed / total) * 80);
    return 20 + actualPercentage;
  };

  return {
    tasks,
    isLoading,
    isError,
    dismissTask,
    getRemainingTasks,
    getCompletionPercentage,
  };
};

export default useTaskData;