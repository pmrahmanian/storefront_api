"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const store = new product_1.ProductStore();
// handlers
const index = async (req, res) => {
    const products = await store.index();
    // @ts-ignore
    res.status(200).json(products);
};
const show = async (req, res) => {
    // @ts-ignore
    const product = await store.show(req.params.id);
    // @ts-ignore
    res.status(200).json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
// routes
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
    app.delete('/products/:id', verifyAuthToken_1.default, destroy);
};
exports.default = product_routes;
