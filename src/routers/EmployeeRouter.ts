import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeService from '../services/EmployeeService';
import ServerError from '../error/ServerError';
import Validate from '../middlewares/Validate';
import EmployeeDto from '../dto/EmployeeDto';

class EmployeeRouter {
    _router = Router();

    private readonly employeeController = new EmployeeController(new EmployeeService());

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
