export default interface Provider {
    id: number | string,
    name?: string,
    email?: string,
    phone?: string,
    qty?: number,
    picture_preview?: string,
    is_visible?: boolean,
}