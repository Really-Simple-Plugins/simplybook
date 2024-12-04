import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types can be moved to a separate types file
interface Task {
  id: number;
  text: string;
  status: "open" | "urgent" | "premium" | "completed" | "dismissed";
  type: "required" | "optional";
  action?: {
    text: string;
    link: string;
  };
}

// TODO: Create these API endpoints
const taskApi = {
  getTasks: async () => {
    // Temporary: Return initial tasks until API is implemented
    return initialTasks;
  },
  updateTaskStatus: async (taskId: number, status: Task["status"]) => {
    // TODO: Implement API call to update task status
    return { taskId, status };
  },
};

const initialTasks: Task[] = [
  {
    id: 1,
    text: "Complete your account setup",
    status: "urgent",
    type: "required",
    action: {
      text: "Complete Setup",
      link: "/setup",
    },
  },
  {
    id: 2,
    text: "Add your first service",
    status: "open",
    type: "required",
    action: {
      text: "Add Service",
      link: "/services/new",
    },
  },
  { id: 3, text: "Set your business hours", status: "open", type: "required" },
  {
    id: 4,
    text: "Configure email notifications",
    status: "premium",
    type: "optional",
  },
  {
    id: 5,
    text: "Customize your booking widget",
    status: "premium",
    type: "optional",
  },
];

const useTaskData = () => {
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
    initialData: initialTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for updating task status
  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: number;
      status: Task["status"];
    }) => taskApi.updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const dismissTask = (id: number) => {
    updateTaskStatus({ taskId: id, status: "dismissed" });
  };

  const completeTask = (id: number) => {
    updateTaskStatus({ taskId: id, status: "completed" });
  };

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
    dismissTask,
    completeTask,
    getRemainingTasks,
    getCompletionPercentage,
  };
};

export default useTaskData;
