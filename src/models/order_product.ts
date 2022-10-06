import database from '../database'

export type OrderProduct = {
    id?: Number;
    order_id: Number;
    product_id: Number;
    quantity: number;
}

export class OrderProductStore {

    async index(): Promise<OrderProduct[]> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM order_products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot connect to database: ${error}`)
        }
    }

    async show(id:string): Promise<OrderProduct> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM order_products WHERE id=($1);'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find Order_Product ${id}: ${error}`)
        }
    }

    async showByOrderID(order_id:string): Promise<OrderProduct[]> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM order_products WHERE order_id=($1);'
            const result = await conn.query(sql, [order_id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Could not find Order ${order_id}: ${error}`)
        }
    }

    async getID (order_id:string, product_id:string): Promise<Number> {
        try {
            const conn = await database.connect()
            const findSQL = 'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2);'
            const found = await conn.query(findSQL, [order_id, product_id])
            const id = found.rows.length > 0 ? found.rows[0].id : -1;
            conn.release()
            return id
        } catch (error) {
            throw new Error(`Could not get id for order_product with product_id ${product_id} and order_id ${order_id}. Error: ${error}`)
        }
    
    }

    async getCurrentQuantity (id:string): Promise<number> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM order_products WHERE id=($1);'
            const result = await conn.query(sql, [id])
            const quantity = result.rows[0].quantity
            conn.release()
            return quantity
        } catch (error) {
            throw new Error(`Could not get quantity for order_product with id ${id}. Error: ${error}`)
        }
    }

    async updateQuantity (id:string, newQuantity:string): Promise<OrderProduct> {
        try {
            const conn = await database.connect()
            const updateSQL = 'UPDATE order_products SET quantity=($2) WHERE id=($1);'
            await conn.query(updateSQL, [id, newQuantity])
            const selectSQL = 'SELECT * FROM order_products WHERE id=($1);'
            const result = await conn.query(selectSQL, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not update quantity for order_product with id ${id}. Error: ${error}`)
        }
    }




}