export type TaskStatus = "open" | "urgent" | "upgrade" | "premium" | "completed" | "dismissed" | "hidden";

export interface Task {
    id: string;
    text: string;
    label: string;
    status: TaskStatus;
    type: "required" | "optional";
    premium: boolean;
    special_feature: boolean;
    priority: number;
    snoozable: boolean;
    action?: {
        text: string;
        link?: string;
        login_link?: string;
        target?: string;
        modal?: {
            id: string;
        };
    };
}