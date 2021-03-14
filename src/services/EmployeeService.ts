// repositories
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import EmployeeRepositoryImpl from '../repositories/EmployeeRepositoryImpl';

// models
import Employee from '../models/Employee';

class EmployeeService {
    private readonly employeeRepository: EmployeeRepository = new EmployeeRepositoryImpl();

    getEmployee = async (id: number): Promise<Employee> => {
        return await this.employeeRepository.getEmployee(id);
    };

    createEmployee = async (employee: Employee): Promise<Employee> => {
        return await this.employeeRepository.createEmployee(employee);
    };
}

export default EmployeeService;
