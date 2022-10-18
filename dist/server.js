"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import type {Application} from 'express'
// import express = require('express')
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const app = (0, express_1.default)();
// const app: express.Application = express();
const address = '0.0.0.0:3000';
const corsOptions = {
    Origin: true,
    optionsSuccessStatus: 200,
};
// apply to all routes
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
// app.get('/', function (req: Request, res: Response) {
// 	res.send('Hello World!');
// });
(0, user_1.default)(app);
(0, order_1.default)(app);
(0, product_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
