import { Request, Response, NextFunction } from 'express';
import database from '../database';

const isOrderOpen = async (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.id;
	try {
		const sql = 'SELECT * FROM orders WHERE id=($1)';
		const conn = database.connect();

		const result = await conn.query(sql, [orderId]);
		const order = result.rows[0];
		if (order.status === 'open') {
			next();
		} else {
			throw new Error(
				`Order ${orderId} is not open and therefore cannot be changed.`
			);
		}
	} catch (error) {
		res.status(400);
		res.json(`Could not find order ${orderId}`);
	}
};

export default isOrderOpen;
