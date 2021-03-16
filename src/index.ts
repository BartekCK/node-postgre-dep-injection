import dotenv from 'dotenv';
import { AwilixContainer } from 'awilix';

// configuration
import Server from './conf/ServerApp';
import setupDependencyInjection from './conf/DepsInjection';
dotenv.config();

process.on('SIGINT', () => {
    console.log('Caught interrupt signal');
    process.exit();
});

const container: AwilixContainer = setupDependencyInjection();
const server = new Server(8080, container.resolve('employeeRouter'));
server.start();
