"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
describe('Order Model', () => {
    const u = {
        // id: ,
        firstName: 'Pedd',
        lastName: 'Matty',
        password: 'testPassword',
    };
    let userID = 0;
    beforeAll(async () => {
        const user = await userStore.create(u);
        userID = user.id;
    });
    const o = {
        // id: ,
        status: order_1.completed,
        user_id: userID,
    };
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('should have a current order for user method', () => {
        expect(store.currentOrderForUser).toBeDefined();
    });
    it('should have a completed orders for user method', () => {
        expect(store.completedOrdersForUser).toBeDefined();
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method should return new order', async () => {
        const result = await store.create(o);
        expect(result).toEqual({ id: 1, ...o });
    });
    it('create method should have inserted new order into database', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            status: order_1.completed,
            user_id: userID,
        });
    });
    it('completedOrdersForUser method should return the correct result array', async () => {
        const result = await store.completedOrdersForUser(`${userID}`);
        expect(result).toEqual([
            {
                id: 1,
                status: order_1.completed,
                user_id: userID,
            },
        ]);
    });
    it('currentOrderForUser method should return the correct result', async () => {
        await store.create({
            status: order_1.open,
            user_id: userID,
        });
        const result = await store.currentOrderForUser(`${userID}`);
        expect(result).toEqual({
            id: 2,
            status: order_1.open,
            user_id: userID,
        });
    });
    it('addProduct method should return new order_product', async () => {
        const order_id = '2';
        const product_id = '1';
        const quantity = 99;
        const result = await store.addProduct(quantity, order_id, product_id);
        expect(result).toEqual({ id: 1, order_id: 2, product_id: 1, quantity: 99 });
    });
    // it("addProduct method should have inserted new order into database", async() => {
    //     const result = await store.index();
    //     expect(result.length).toEqual(1);
    // });
});
