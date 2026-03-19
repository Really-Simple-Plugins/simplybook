export class DataError extends Error {
    public fields: {} | undefined;
    public data: any;

    constructor(message: string, fields?: object, data?: any, ...params: undefined[]) {
        super(message, ...params);
        this.name = "DataError";
        this.fields = fields;
        this.data = data;

        // Maintains proper stack trace for where our error was thrown (non-standard)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DataError);
        }
    }
}
