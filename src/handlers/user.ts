import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

// handlers
const index = async (req: Request, res: Response) => {
	const users = await store.index();
	// @ts-ignore
	res.status(200).json(users);
};

const show = async (req: Request, res: Response) => {
	// @ts-ignore
	const user = await store.show(req.params.id);
	// @ts-ignore
	res.status(200).json(user);
};

const create = async (req: Request, res: Response) => {
	try {
		const user: User = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
		};

		const newUser = await store.create(user);

		// create JWT
		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);

		res.json(token);
	} catch (error) {
		res.status(400);
		res.json(error);
	}
};

const authenticate = async (req: Request, res: Response) => {
	const user: User = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
	};
	try {
		const u = await store.authenticate(user);
		const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
		res.json(token);
	} catch (error) {
		res.status(401);
		res.json({ error });
	}
};

const destroy = async (req: Request, res: Response) => {
	const deleted = await store.delete(req.body.id);
	res.json(deleted);
};

// routes
const user_routes = (app: Express.Application) => {
	app.get('/users', verifyAuthToken, index);
	app.get('/users/:id', verifyAuthToken, show);
	app.post('/users', verifyAuthToken, create);
	app.delete('/users/:id', verifyAuthToken, destroy);
	app.post('/users/authenticate', authenticate);
};

export default user_routes;
