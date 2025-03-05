export interface Task {
    id: string;
    text: string;
    status: "open" | "urgent" | "premium" | "completed" | "dismissed";
    type: "required" | "optional";
    action?: {
        text: string;
        link: string;
    };
}