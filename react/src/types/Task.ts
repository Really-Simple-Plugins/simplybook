export interface Task {
    id: string;
    text: string;
    label: string;
    status: "open" | "urgent" | "completed" | "dismissed" | "hidden";
    type: "required" | "optional";
    premium: boolean;
    special_feature: boolean;
    priority: number;
    action?: {
        text: string;
        link?: string;
        login_link?: string;
        target?: string;
        modal?: {
            id: string;
        }
    };
}