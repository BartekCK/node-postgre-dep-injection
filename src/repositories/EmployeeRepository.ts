import Employee from '../models/Employee';

export interface EmployeeRepository {
    createEmployee: (employee: Employee) => Promise<Employee>;
    getEmployee: (id: number) => Promise<Employee>;
}
