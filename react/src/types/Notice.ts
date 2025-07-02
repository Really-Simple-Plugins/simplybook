export interface Notice {
    id: string;
    title: string;
    text: string;
    active: boolean;
    status: "open" | "hidden";
    type: "info" | "warning";
    route: string;
    premium: boolean;
    priority: number;
    action?: {
        text: string;
        link?: string;
        login_link?: string;
    };
}