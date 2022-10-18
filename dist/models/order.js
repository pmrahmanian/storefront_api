"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = exports.open = exports.completed = void 0;
const database_1 = __importDefault(require("../database"));
exports.completed = 'completed';
exports.open = 'open';
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders;';
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
            const sql = 'SELECT * FROM orders WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find Order ${id}. Error: ${error}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`);
        }
    }
    async currentOrderForUser(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2) ORDER BY id DESC;';
            const result = await conn.query(sql, [user_id, exports.open]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get current order for user ${user_id}. Error: ${error}`);
        }
    }
    async completedOrdersForUser(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);';
            const result = await conn.query(sql, [user_id, exports.completed]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get completed orders for user ${user_id}. Error: ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            // @ts-ignore
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find Order ${id}. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
