import database from '../database';

export type Product = {
	id?: Number;
	name: string;
	price: number;
	category: string;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await database.connect();
			const sql = 'SELECT * FROM products;';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Cannot connect to database: ${error}`);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const conn = await database.connect();
			const sql = 'SELECT * FROM products WHERE id=($1);';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find product ${id}. Error: ${error}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const conn = await database.connect();
			const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;`;
			const result = await conn.query(sql, [p.name, p.price, p.category]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not add new product ${p.name}. Error: ${error}`);
		}
	}

	async indexByCategory(category: string): Promise<Product[]> {
		try {
			const conn = await database.connect();
			const sql = 'SELECT * FROM products WHERE category=($1);';
			const result = await conn.query(sql, [category]);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(
				`Could not get products with category ${category}. Error: ${error}`
			);
		}
	}

	async delete(id:string): Promise<Product> {
		try {
			const conn = await database.connect();
			const sql = 'DELETE FROM products WHERE id=($1);';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find Product ${id}. Error: ${error}`)
		}

	}
}
