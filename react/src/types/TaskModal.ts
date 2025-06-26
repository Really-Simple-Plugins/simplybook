interface ModalButton {
    image?: string,
    link?: string
    qr?: string
}

export interface TaskModal {
    image?: string,
    backgroundImage?: string,
    title?: string,
    content?: string
    buttons?: ModalButton[]
    footer?: {
        text: string,
        link: string,
        linkText: string
    }
}