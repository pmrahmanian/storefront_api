"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot connect to database: ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO products (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *;`;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new user ${u.firstName} ${u.lastName}. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM books WHERE id=($1);';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(u) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE firstName=($1) AND lastName=($2);';
        const matches = await conn.query(sql, [u.firstName, u.lastName]);
        // continue logic if there are matching user names
        if (matches.rows.length) {
            for (const user of matches.rows) {
                if (bcrypt_1.default.compareSync(u.password + pepper, user.password_digest)) {
                    return user;
                }
            }
        }
        // otherwise return null
        return null;
    }
}
exports.UserStore = UserStore;
