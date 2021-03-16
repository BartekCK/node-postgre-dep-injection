import * as awilix from 'awilix';

// configuration
import DatabaseApp from './DatabaseApp';

// routes
import EmployeeRouter from '../routers/EmployeeRouter';

// controllers
import EmployeeController from '../controllers/EmployeeController';

// services
import EmployeeService from '../services/EmployeeService';

// repositories
import EmployeeRepositoryImpl from '../repositories/EmployeeRepositoryImpl';

const setupDependencyInjection = (): awilix.AwilixContainer => {
    const container: awilix.AwilixContainer = awilix.createContainer({
        injectionMode: awilix.InjectionMode.PROXY,
    });

    container.register({
        employeeRouter: awilix.asClass(EmployeeRouter),
        employeeController: awilix.asClass(EmployeeController),
        employeeService: awilix.asClass(EmployeeService),
        employeeRepository: awilix.asClass(EmployeeRepositoryImpl),
        databaseApp: awilix.asClass(DatabaseApp, { lifetime: awilix.Lifetime.SINGLETON }),
    });

    return container;
};

export default setupDependencyInjection;
