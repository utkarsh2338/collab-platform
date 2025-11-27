const { Client } = require('pg');
require('dotenv').config();

const dbName = 'collab_db';
// Use env vars or defaults. Note: This script assumes you can connect to 'postgres' db.
const config = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres',
};

const client = new Client(config);

async function createDb() {
    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
        console.log('Please ensure PostgreSQL is running and credentials are correct.');
    } finally {
        await client.end();
    }
}

createDb();
