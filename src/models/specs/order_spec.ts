import { Order, OrderStore, completed, open } from '../order'
import { User, UserStore } from '../user'

const store = new OrderStore()
const userStore = new UserStore()

describe("Order Model",  () => {
    const u: User = {
        // id: ,
        firstName: "Pedd",
        lastName: "Matty",
        password: "testPassword"
    }

    let userID:Number = 0

    beforeAll( async() => {
        const user = await userStore.create(u)
        userID = (user.id) as Number
    })

    const o: Order = {
        // id: ,
        status: completed,
        user_id: userID
    }

    it("should have an index method",  () => {
        expect(store.index).toBeDefined();
    });

    it("should have a create method",  () => {
        expect(store.create).toBeDefined();
    });

    it("should have a show method",  () => {
        expect(store.show).toBeDefined();
    });

    it("should have a current order for user method",  () => {
        expect(store.currentOrderForUser).toBeDefined();
    });

    it("should have a completed orders for user method",  () => {
        expect(store.completedOrdersForUser).toBeDefined();
    });


    it("index method should return a list of orders", async() => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should return new order", async() => {
        const result = await store.create(o);
        expect(result).toEqual({id: 1, ...o});
    });

    it("create method should have inserted new order into database", async() => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });

    it("show method should return the correct product", async() => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: completed,
            user_id: userID
        })
    })

    it("completedOrdersForUser method should return the correct result array", async() => {
        const result = await store.completedOrdersForUser(`${userID}`);
        expect(result).toEqual([{
            id: 1,
            status: completed,
            user_id: userID
        }])
    })

    it("currentOrderForUser method should return the correct result", async() => {
        await store.create({
            status: open,
            user_id: userID
        })
        const result = await store.currentOrderForUser(`${userID}`);
        expect(result).toEqual({
            id: 2,
            status: open,
            user_id: userID
        })
    })


})