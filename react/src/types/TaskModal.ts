interface CallsToAction {
    button?: ModalButton,
}

interface ModalButton {
    image?: string,
    link?: string,
    text?: string,
    showText?: boolean,
}

interface ContentOptions {
    type?: string,
    content?: string | CallsToAction[],
    altText?: string,
}

export interface TaskModal {
    backgroundImage?: string,
    callsToAction?: CallsToAction[],
    columns?: ContentOptions[][],
}