import { Request, Response } from 'express';

// services
import EmployeeService from '../services/EmployeeService';

// models
import Employee from '../models/Employee';
import EmployeeDto from '../dto/EmployeeDto';

class EmployeeController {
    private readonly employeeService: EmployeeService;

    constructor({ employeeService }: any) {
        this.employeeService = employeeService;
    }

    createEmployee = async (req: Request<any, any, EmployeeDto>, res: Response<Employee>): Promise<void> => {
        const result: Employee = await this.employeeService.createEmployee(req.body);
        res.status(201).json(result);
    };

    getEmployee = async (req: Request<{ id: number }>, res: Response<Employee>): Promise<void> => {
        const employee: Employee = await this.employeeService.getEmployee(req.params.id);
        res.status(200).json(employee);
    };
}

export default EmployeeController;
