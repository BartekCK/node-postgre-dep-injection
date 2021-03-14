import { Pool } from 'pg';

class DatabaseApp {
    _pool: Pool;

    constructor() {
        const { POSTGRES_DB, PGHOST, POSTGRES_PASSWORD, PGPORT, POSTGRES_USER } = process.env;

        if (!(POSTGRES_DB || PGHOST || POSTGRES_PASSWORD || PGPORT || POSTGRES_USER)) {
            throw new Error('Database connection EVN problem');
        }
        this._pool = new Pool({
            user: POSTGRES_USER,
            host: PGHOST,
            database: POSTGRES_DB,
            password: POSTGRES_PASSWORD,
            port: Number(PGPORT),
            max: 20,
            min: 0,
            connectionTimeoutMillis: 3000,
        });

        this._pool.on('error', (err: Error) => {
            console.log('Database connection error');
            console.log(err);
            process.exit(-1);
        });
    }

    get pool(): Pool {
        return this._pool;
    }
}

export default DatabaseApp;
