class ApiError extends Error {
    private readonly code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }

    getCode = (): number => {
        return this.code;
    };

    static badRequest(msg: string) {
        return new ApiError(400, msg);
    }

    static notFound(msg: string) {
        return new ApiError(404, msg);
    }

    static internal(msg: string) {
        return new ApiError(500, msg);
    }
}

export default ApiError;
