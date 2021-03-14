import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';

// errors
import ApiError from '../error/ApiError';

// interfaces
import { IValidationDTO } from '../interfaces';

abstract class Validate {
    static startValidationBySchema<T>(schema: ObjectSchema<T>): any {
        return (req: Request, res: Response, next: any) => {
            const { error, value } = schema.validate(req.body);
            if (error) {
                next(ApiError.badRequest('error'));
                return;
            }
            req.body = value;
            next();
        };
    }

    static validateByObject<T extends IValidationDTO<T>>(Class: new (arg: T) => T): any {
        return async (req: Request<any, any, T>, res: Response, next: any) => {
            const object: T = new Class({ ...req.body });
            try {
                await object.getSchema().validateAsync({ ...req.body });
            } catch (e) {
                next(ApiError.badRequest(e.message));
            }
            next();
        };
    }
}

export default Validate;
