"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.UserStore();
// handlers
const index = async (req, res) => {
    const users = await store.index();
    // @ts-ignore
    res.status(200).json(users);
};
const show = async (req, res) => {
    // @ts-ignore
    const user = await store.show(req.params.id);
    // @ts-ignore
    res.status(200).json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        // create JWT
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user);
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
// routes
const user_routes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.post('/users', verifyAuthToken_1.default, create);
    app.delete('/users/:id', verifyAuthToken_1.default, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.default = user_routes;
