import EmployeeService from '../services/EmployeeService';
import { Request, Response } from 'express';
import EmployeeDto from '../dto/EmployeeDto';
import Employee from '../models/Employee';

class EmployeeController {
    private readonly employeeService;

    constructor(employeeService: EmployeeService) {
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
