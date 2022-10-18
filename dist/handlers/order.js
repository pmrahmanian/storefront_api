"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
const isOrderOpen_1 = __importDefault(require("../middlewares/isOrderOpen"));
const store = new order_1.OrderStore();
// handlers
const index = async (req, res) => {
    const user_id = req.params.user;
    const status = req.params.status;
    // @ts-ignore
    let orders;
    if (user_id) {
        if (status === 'complete') {
            orders = await store.completedOrdersForUser(user_id);
        }
        else {
            orders = await store.currentOrderForUser(user_id);
        }
    }
    else {
        orders = await store.index();
    }
    // @ts-ignore
    res.status(200).json(orders);
};
const show = async (req, res) => {
    // @ts-ignore
    const order = await store.show(req.params.id);
    // @ts-ignore
    res.status(200).json(order);
};
const create = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
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
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
// routes
const order_routes = (app) => {
    app.get('/orders/{:user_id}.{:status}', verifyAuthToken_1.default, index);
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.delete('/orders/:id', verifyAuthToken_1.default, destroy);
    app.post('/orders/:id/products', verifyAuthToken_1.default, isOrderOpen_1.default, addProduct);
};
exports.default = order_routes;
