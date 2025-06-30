interface CallsToAction {
    button?: ModalButton,
    qr?: string,
}

interface ModalButton {
    image?: string,
    link?: string,
    text?: string,
}

export interface TaskModal {
    image?: string,
    backgroundImage?: string,
    title?: string,
    content?: {
        sections: string[]
    }
    callsToAction?: CallsToAction[]
    footer?: {
        text: string,
        link: string,
        linkText: string,
    }
}