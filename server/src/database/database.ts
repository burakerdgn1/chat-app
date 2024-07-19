import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
    private pool?: Pool;

    constructor() {
        this.connect();
    }
    private connect() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        });
    }

    async disconnect() {
        await this.pool?.end();
    }

    async query(sql: string, params: any[] = []) {
        if (!this.pool) {
            throw new Error('Database connection pool has not been initialized.');
        }
        try {
            const result = await this.pool.query(sql, params);
            return result.rows;
        } catch (err) {
            throw new Error(`Error executing query: ${err}`);
        }
    }
}

