import { ObjectSchema } from 'joi';

export interface IValidationDTO<T> {
    getSchema: () => ObjectSchema<T>;
}

export interface IModel {
    getId: () => number | undefined;
}
