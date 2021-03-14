import { EmployeeRepository } from './EmployeeRepository';
import Employee from '../models/Employee';
import DatabaseApp from '../conf/DatabaseApp';
import { Pool, QueryResult } from 'pg';
import ApiError from '../error/ApiError';

class EmployeeRepositoryImpl implements EmployeeRepository {
    private readonly database: Pool;

    constructor() {
        const databaseApp = new DatabaseApp();
        this.database = databaseApp.pool;
        // this.createTable();
    }

    createEmployee = async (employee: Employee): Promise<Employee> => {
        const { firstName, lastName, email, middleNames } = employee;
        const dbQuery: QueryResult<Employee> = await this.database.query(
            'INSERT INTO employees (email, firstName, middleNames, lastName) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, firstName, middleNames, lastName],
        );
        return dbQuery.rows[0];
    };

    getEmployee = async (id: number): Promise<Employee> => {
        const result: QueryResult<Employee> = await this.database.query('SELECT * FROM employees WHERE id = $1', [id]);
        if (!result.rows[0]) {
            throw ApiError.notFound(`Employee by id ${id} not found`);
        }
        return result.rows[0];
    };

    private createTable = async () => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await this.database.query('drop table if exists employees');
            }
            await this.database.query(
                'CREATE TABLE employees ' +
                    '(ID SERIAL PRIMARY KEY, email VARCHAR(30), firstName VARCHAR(30), middleNames VARCHAR(30), lastName VARCHAR(30))',
            );
            console.log('Table employees created');
        } catch (e) {
            console.log(e.message);
        }
    };
}

export default EmployeeRepositoryImpl;
