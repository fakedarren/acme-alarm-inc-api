import dotenv from 'dotenv';
dotenv.config();

import pgp from 'pg-promise';

const {
  DATABASE_URL = null,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} = process.env;

export default pgp()({
  connectionString: DATABASE_URL,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});
