import { Pool, QueryResult } from 'pg';

// configuration
import DatabaseApp from '../conf/DatabaseApp';

// repositories
import { EmployeeRepository } from './EmployeeRepository';

// errors
import ApiError from '../error/ApiError';

// models
import Employee from '../models/Employee';

class EmployeeRepositoryImpl implements EmployeeRepository {
    private readonly database: Pool;

    constructor() {
        const databaseApp = new DatabaseApp();
        this.database = databaseApp.pool;
    }

    createEmployee = async (employee: Employee): Promise<Employee> => {
        const { firstName, lastName, email, middleNames } = employee;
        try {
            const dbQuery: QueryResult<Employee> = await this.database.query(
                'INSERT INTO employees (email, firstName, middleNames, lastName) VALUES ($1, $2, $3, $4) RETURNING *',
                [email, firstName, middleNames, lastName],
            );
            return dbQuery.rows[0];
        } catch (e) {
            throw ApiError.internal('Database connection error');
        }
    };

    getEmployee = async (id: number): Promise<Employee> => {
        try {
            const result: QueryResult<Employee> = await this.database.query('SELECT * FROM employees WHERE id = $1', [
                id,
            ]);
            if (!result.rows[0]) {
                throw ApiError.notFound(`Employee by id ${id} not found`);
            }
            return result.rows[0];
        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            throw ApiError.internal('Database connection error');
        }
    };
}

export default EmployeeRepositoryImpl;
