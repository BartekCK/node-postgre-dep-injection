import faker from 'faker';
import { assert } from 'chai';

// services
import EmployeeService from '../../../src/services/EmployeeService';

// repositories
import { EmployeeRepository } from '../../../src/repositories/EmployeeRepository';

// models
import Employee from '../../../src/models/Employee';

describe('Unit tests EmployeeService', () => {
    const employeeObj = new Employee(
        faker.internet.email(),
        faker.name.firstName(),
        `${faker.name.firstName()} ${faker.name.lastName()}`,
        faker.name.lastName(),
        1,
    );

    const employeeList: Employee[] = [employeeObj];

    const employeeRepository: EmployeeRepository = {
        createEmployee: (employee) => new Promise((resolve) => resolve(employee)),
        getEmployee: (id) =>
            new Promise((resolve, reject) => {
                const foundEmployee: Employee | undefined = employeeList.find((el) => el.getId() === id);
                if (foundEmployee) {
                    resolve(foundEmployee);
                }
                reject(new Error(`Employee by id ${id} not found`));
            }),
    };

    const employeeService = new EmployeeService({ employeeRepository });

    it('Should return user by user id', async () => {
        const result = await employeeService.getEmployee(1);
        assert.equal(result, employeeObj);
    });

    it('Should did not find', async () => {
        const tempEmployeeId: number = 2;
        try {
            await employeeService.getEmployee(tempEmployeeId);
        } catch (e) {
            assert.equal(e.message, `Employee by id ${tempEmployeeId} not found`);
        }
    });

    it('Should create user and return', async () => {
        const result = await employeeService.createEmployee(employeeObj);
        assert.equal(result, employeeObj);
    });
});
