import { Router } from 'express';

// middlewares
import Validate from '../middlewares/Validate';

// controllers
import EmployeeController from '../controllers/EmployeeController';

// services
import EmployeeService from '../services/EmployeeService';

// errors
import ServerError from '../error/ServerError';

// models
import EmployeeDto from '../dto/EmployeeDto';

class EmployeeRouter {
    _router = Router();

    private readonly employeeController: EmployeeController;

    constructor({ employeeController }: any) {
        this.employeeController = employeeController;
    }

    private setup = (): void => {
        this.getHttpMethod();
        this.postHttpMethod();
    };

    private getHttpMethod = (): void => {
        this._router.get('/:id', ServerError.apiErrorWrapper(this.employeeController.getEmployee));
    };

    private postHttpMethod = (): void => {
        this._router.post(
            '/',
            Validate.validateByObject<EmployeeDto>(EmployeeDto),
            ServerError.apiErrorWrapper(this.employeeController.createEmployee),
        );
    };

    get router(): Router {
        this.setup();
        return this._router;
    }
}

export default EmployeeRouter;
