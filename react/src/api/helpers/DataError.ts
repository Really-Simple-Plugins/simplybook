export class DataError extends Error {
    public fields: {} | undefined;
    constructor(message: string, fields?: object, ...params: undefined[]) {
        super(message, ...params);
        this.name = "DataError";
        this.fields = fields;

        // Maintains proper stack trace for where our error was thrown (non-standard)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DataError);
        }
    }
}