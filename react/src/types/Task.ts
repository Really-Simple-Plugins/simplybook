export interface Task {
    id: string;
    text: string;
    status: "open" | "urgent" | "completed" | "dismissed" | "hidden";
    type: "required" | "optional";
    priority: number;
    action?: {
        text: string;
        link: string;
    };
}