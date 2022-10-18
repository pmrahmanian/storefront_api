"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const product_1 = require("../product");
const order_product_1 = require("../order_product");
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const store = new order_product_1.OrderProductStore();
describe('Order Model', () => {
    const u = {
        // id: ,
        firstName: 'Pedd',
        lastName: 'Matty',
        password: 'testPassword',
    };
    const p = {
        // id: ,
        name: 'Flashlight',
        price: 12.99,
        category: 'EDC',
    };
    let productID = 0;
    let orderID = 0;
    beforeAll(async () => {
        // @ts-ignore
        const user = await userStore.create(u);
        const o = {
            // id: ,
            status: order_1.completed,
            user_id: user.id,
        };
        const order = await orderStore.create(o);
        orderID = order.id;
        const product = await productStore.create(p);
        productID = product.id;
    });
    const op = {
        order_id: orderID,
        product_id: productID,
        quantity: 99,
    };
    let OPID = -1;
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a showByOrderID method', () => {
        expect(store.showByOrderID).toBeDefined();
    });
    it('should have a getID method', () => {
        expect(store.getID).toBeDefined();
    });
    it('should have a getCurrentQuantity method', () => {
        expect(store.getCurrentQuantity).toBeDefined();
    });
    it('should have a updateQuantity method', () => {
        expect(store.updateQuantity).toBeDefined();
    });
    it('index method should return a list of order_products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('getID method should -1 if not found', async () => {
        const result = await store.getID(`${orderID}`, `${productID}`);
        expect(result).toEqual(-1);
    });
    it('getID method should return correct value', async () => {
        const result = await store.getID(`${orderID}`, `${productID}`);
        OPID = result;
        expect(result).toEqual(1);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            order_id: orderID,
            product_id: productID,
            quantity: 99,
        });
    });
    it('showByOrderID method should return the correct product', async () => {
        const result = await store.showByOrderID(`${op.order_id}`);
        expect(result).toEqual([
            {
                id: 1,
                order_id: orderID,
                product_id: productID,
                quantity: 99,
            },
        ]);
    });
    it('getCurrentQuantity method should return the correct quantity', async () => {
        const result = await store.getCurrentQuantity(`${OPID}`);
        expect(result).toEqual(op.quantity);
    });
    it('updateQuantity method should return the correct quantity', async () => {
        const result = await store.updateQuantity(`${OPID}`, `${709}`);
        expect(result.quantity).toEqual(709);
    });
});
