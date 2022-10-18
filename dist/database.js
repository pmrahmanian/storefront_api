"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_test, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let database = new pg_1.Pool({});
console.log(`Environment: ${ENV}`);
if (ENV === 'dev') {
    database = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'test') {
    database = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_test,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = database;
