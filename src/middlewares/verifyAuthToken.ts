import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader:string = req.headers.authorization;
		const token = authorizationHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch (error) {
		res.status(401);
		res.json('Access denied, invalid token');
	}
};

export default verifyAuthToken;
