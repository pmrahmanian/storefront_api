import database from '../database'
import {OrderProduct} from './order_product'

export type Order = {
    id?: Number;
    status: string;
    user_id: Number;
}

export const completed = "completed";
export const open = "open";

export class OrderStore {
    async index(): Promise<Order[]> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot connect to database: ${error}`)
        }
    }


    async show(id:string): Promise<Order> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1);'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find Order ${id}. Error: ${error}`)
        }
    }

    async create (o:Order): Promise<Order> {
        try {
            const conn = await database.connect()
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;'
            const result = await conn.query(sql, [o.status, o.user_id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`)
        }
    }

    async currentOrderForUser (user_id:string): Promise<Order> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2) ORDER BY id DESC;'
            const result = await conn.query(sql, [user_id, open])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not get current order for user ${user_id}. Error: ${error}`)
        }
    }

    async completedOrdersForUser (user_id:string): Promise<Order[]> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);'
            const result = await conn.query(sql, [user_id, completed])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Could not get completed orders for user ${user_id}. Error: ${error}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct | Order> {
        try {
            const conn = await database.connect()
            // @ts-ignore
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;'
            const result = await conn.query(sql, [orderId, productId, quantity])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error: ${error}`)
        }
    }
}