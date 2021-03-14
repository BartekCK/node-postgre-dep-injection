import Joi, { ObjectSchema } from 'joi';

// models
import Employee from '../models/Employee';

// interfaces
import { IValidationDTO } from '../interfaces';

class EmployeeDto extends Employee implements IValidationDTO<EmployeeDto> {
    constructor(employee: Employee) {
        const { middleNames, email, lastName, firstName } = employee;
        super(email, firstName, middleNames, lastName);
    }

    getSchema(): ObjectSchema<EmployeeDto> {
        return Joi.object<Employee>({
            email: Joi.string().email().required(),
            firstName: Joi.string().alphanum().required(),
            lastName: Joi.string().alphanum().required(),
            middleNames: Joi.string().required(),
        });
    }
}

export default EmployeeDto;
