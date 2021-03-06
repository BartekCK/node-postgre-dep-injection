import express, { Express } from 'express';
import { Server } from 'http';
import morgan from 'morgan';

// errors
import ServerError from '../error/ServerError';

// routes
import EmployeeRouter from '../routers/EmployeeRouter';

class ServerApp {
    private readonly PORT: number;

    private server!: Server;
    private readonly app: Express = express();
    private employeeRouter: EmployeeRouter;

    constructor(PORT: number, employeeRouter: EmployeeRouter) {
        this.PORT = PORT;
        this.employeeRouter = employeeRouter;
        this.setup();
    }

    public setup = () => {
        this.app.use(express.json());
        this.app.use(morgan('combined'));
        this.app.use('/', this.employeeRouter.router);
        this.app.use(ServerError.apiErrorHandler);
    };

    public start = () => {
        this.server = this.app.listen(this.PORT, () => {
            console.log(`App started on PORT ${this.PORT}`);
        });
    };

    public stop = (callback?: (err?: Error) => void) => {
        if (!this.server) {
            throw new Error('First run start method');
        }
        this.server.close(callback);
    };
}

export default ServerApp;
