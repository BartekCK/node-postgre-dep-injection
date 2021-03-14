import Employee from '../models/Employee';

class EmployeeDto extends Employee {
    constructor(email: string, firstName: string, middleNames: string, lastName: string) {
        super(email, firstName, middleNames, lastName);
    }
}

export default EmployeeDto;
