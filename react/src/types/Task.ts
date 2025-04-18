export interface Task {
    id: string;
    text: string;
    status: "open" | "urgent" | "premium" | "completed" | "dismissed";
    type: "required" | "optional";
    priority: number;
    action?: {
        text: string;
        link: string;
    };
}