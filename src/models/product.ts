import database from '../database'

export type Product = {
    id: Number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {

    async index(): Promise<Product[]> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot connect to database: ${error}`)
        }
    }


    async show(id:string): Promise<Product> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`)
        }
    }

}