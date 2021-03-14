import dotenv from 'dotenv';
dotenv.config();
import Server from './conf/ServerApp';

process.on('SIGINT', () => {
    console.log('Caught interrupt signal');
    process.exit();
});

const server = new Server(8080);
server.start();
