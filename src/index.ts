import dotenv from 'dotenv';
import Server from './conf/ServerApp';

dotenv.config();

process.on('SIGINT', () => {
    console.log('Caught interrupt signal');
    process.exit();
});

const server = new Server(8080);
server.start();
