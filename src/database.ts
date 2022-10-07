import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_DB_test,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
} = process.env;

let database: Pool = new Pool({});
console.log(`Environment: ${ENV}`);

if (ENV === 'dev') {
	database = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

if (ENV === 'test') {
	database = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB_test,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

export default database;
