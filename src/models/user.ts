import database from '../database'

export type User = {
    id?:  Number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {

    async index(): Promise<User[]> {
        try { 
            const conn = await database.connect()
            const sql = 'SELECT * FROM users;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot connect to database: ${error}`)
        }
    }


    async show(id:string): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = 'SELECT * FROM users WHERE id=($1);'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find user ${id}. Error: ${error}`)
        }
    }

    async create (u:User): Promise<User> {
        try {
            const conn = await database.connect()
            const sql = `INSERT INTO products (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;`
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new user ${u.firstName} ${u.lastName}. Error: ${error}`)
        }
    }

    async delete (id:string): Promise<User> {
        try {
            const sql = 'DELETE FROM books WHERE id=($1);'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

}