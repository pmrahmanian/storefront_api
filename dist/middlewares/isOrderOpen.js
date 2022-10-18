"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const isOrderOpen = async (req, res, next) => {
    const orderId = req.params.id;
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const conn = database_1.default.connect();
        const result = await conn.query(sql, [orderId]);
        const order = result.rows[0];
        if (order.status === 'open') {
            next();
        }
        else {
            throw new Error(`Order ${orderId} is not open and therefore cannot be changed.`);
        }
    }
    catch (error) {
        res.status(400);
        res.json(`Could not find order ${orderId}`);
    }
};
exports.default = isOrderOpen;
