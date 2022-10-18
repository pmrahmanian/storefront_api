import express, { Express, Application, Request, Response } from 'express';
// import type {Application} from 'express'
// import express = require('express')
import bodyParser from 'body-parser';
import cors from 'cors';

import user_routes from './handlers/user';
import order_routes from './handlers/order';
import product_routes from './handlers/product';

const app = express();
// const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
	Origin: true, //allow all cross origins
	optionsSuccessStatus: 200,
};
// apply to all routes
app.use(cors(corsOptions));

app.use(bodyParser.json());

// app.get('/', function (req: Request, res: Response) {
// 	res.send('Hello World!');
// });

user_routes(app);
order_routes(app);
product_routes(app);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
