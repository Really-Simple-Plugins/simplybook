export interface Task {
    id: string;
    text: string;
    status: "open" | "urgent" | "completed" | "dismissed" | "hidden";
    type: "required" | "optional";
    premium: boolean;
    priority: number;
    action?: {
        text: string;
        link?: string;
        login_link?: string;
    };
}