"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    const p = {
        // id: ,
        name: 'Parachute',
        price: 89.92,
        category: 'gear',
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
    it('should have a index By Category method', () => {
        expect(store.indexByCategory).toBeDefined();
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method should return new product', async () => {
        const result = await store.create(p);
        expect(result).toEqual({ id: 1, ...p });
    });
    it('create method should have inserted new product into database', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'Parachute',
            price: 89.92,
            category: 'gear',
        });
    });
    it('indexByCategory method should return the correct result array', async () => {
        const result = await store.indexByCategory('gear');
        expect(result).toEqual([
            {
                id: 1,
                name: 'Parachute',
                price: 89.92,
                category: 'gear',
            },
        ]);
    });
});
