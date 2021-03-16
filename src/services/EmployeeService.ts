// repositories
import { EmployeeRepository } from '../repositories/EmployeeRepository';

// models
import Employee from '../models/Employee';

class EmployeeService {
    private readonly employeeRepository: EmployeeRepository;

    constructor({ employeeRepository }: any) {
        this.employeeRepository = employeeRepository;
    }

    getEmployee = async (id: number): Promise<Employee> => {
        return await this.employeeRepository.getEmployee(id);
    };

    createEmployee = async (employee: Employee): Promise<Employee> => {
        return await this.employeeRepository.createEmployee(employee);
    };
}

export default EmployeeService;
