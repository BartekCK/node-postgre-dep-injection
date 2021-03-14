import express, { Express } from 'express';
import { Server } from 'http';
import ServerError from '../error/ServerError';
import EmployeeRouter from '../routers/EmployeeRouter';
import morgan from 'morgan';

class ServerApp {
    private readonly PORT: number;

    private server!: Server;
    private readonly app: Express = express();
    private employeeRouter: EmployeeRouter = new EmployeeRouter();

    constructor(PORT: number) {
        this.PORT = PORT;
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
