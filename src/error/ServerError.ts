import { Request, Response } from 'express';
import ApiError from './ApiError';

abstract class ServerError {
    public static apiErrorHandler(err: ApiError, req: Request, res: Response, next: (err?: any) => void) {
        return res.status(err.getCode()).send(err.message);
    }

    public static apiErrorWrapper = (callback: (req: Request<any>, res: Response<any>, next: any) => Promise<void>) => {
        return async (req: Request, res: Response, next: any) => {
            try {
                await callback(req, res, next);
            } catch (e) {
                next(e);
            }
        };
    };
}

export default ServerError;
