import EmployeeService from '../services/EmployeeService';
import { Request, Response } from 'express';
import EmployeeDto from '../dto/EmployeeDto';

class EmployeeController {
    private readonly employeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    createEmployee = async (req: Request<any, any, EmployeeDto>, res: Response<EmployeeDto>): Promise<void> => {
        const result: EmployeeDto = await this.employeeService.createEmployee(req.body);
        res.status(201).json(result);
    };

    getEmployee = async (req: Request<{ id: number }>, res: Response<EmployeeDto>): Promise<void> => {
        const employee: EmployeeDto = await this.employeeService.getEmployee(req.params.id);
        res.status(200).json(employee);
    };
}

export default EmployeeController;
