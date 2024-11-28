import { create } from "zustand";

interface Task {
  id: number;
  text: string;
  status: 'open' | 'urgent' | 'premium' | 'completed' | 'dismissed';
  type: 'required' | 'optional';
  action?: {
    text: string;
    link: string;
  };
}

interface TaskStore {
  tasks: Task[];
  dismissTask: (id: number) => void;
  completeTask: (id: number) => void;
  getRemainingTasks: () => Task[];
  getCompletionPercentage: () => number;
}

const initialTasks: Task[] = [
  { 
    id: 1, 
    text: "Complete your account setup", 
    status: 'urgent', 
    type: 'required',
    action: {
      text: "Complete Setup",
      link: "/setup"
    }
  },
  { 
    id: 2, 
    text: "Add your first service", 
    status: 'open', 
    type: 'required',
    action: {
      text: "Add Service",
      link: "/services/new"
    }
  },
  { id: 3, text: "Set your business hours", status: 'open', type: 'required' },
  { id: 4, text: "Configure email notifications", status: 'premium', type: 'optional' },
  { id: 5, text: "Customize your booking widget", status: 'premium', type: 'optional' },
];

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  dismissTask: (id) => 
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, status: 'dismissed' } : task
      )
    })),
  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    })),
  getRemainingTasks: () => {
    return get().tasks.filter(task => 
      ['open', 'urgent', 'premium'].includes(task.status)
    );
  },
  getCompletionPercentage: () => {
    const tasks = get().tasks;
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'dismissed' || task.status === 'completed').length;
    const actualPercentage = Math.round((completed / total) * 80);
    return 20 + actualPercentage;
  },
}));

export default useTaskStore; 