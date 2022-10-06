import database from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD as string
const saltRounds = process.env.SALT_ROUNDS as string

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
            const sql = `INSERT INTO products (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *;`

            const hash = bcrypt.hashSync((u.password + pepper), parseInt(saltRounds))

            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
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

    async authenticate(u:User): Promise<User | null> {
        const conn = await database.connect()
        const sql = 'SELECT * FROM users WHERE firstName=($1) AND lastName=($2);'
        const matches = await conn.query(sql, [u.firstName, u.lastName])
        // continue logic if there are matching user names
        if (matches.rows.length) {

            for (const user of matches.rows) {
                if (bcrypt.compareSync(u.password+pepper, user.password_digest)) {
                    return user;
                }
            }
        }
        // otherwise return null
        return null
    }

}