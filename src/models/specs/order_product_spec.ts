import { Order, OrderStore, completed, open } from '../order'
import { User, UserStore } from '../user'
import { Product, ProductStore } from '../product'
import { OrderProduct, OrderProductStore } from '../order_product'


const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()
const store = new OrderProductStore()


describe("Order Model",  () => {
    const u: User = {
        // id: ,
        firstName: "Pedd",
        lastName: "Matty",
        password: "testPassword"
    }

    const p: Product = {
        // id: ,
        name: "Flashlight",
        price: 12.99,
        category: "EDC"
    }

    let productID:Number = 0
    let orderID:Number = 0

    beforeAll( async() => {
        // @ts-ignore
        const user = await userStore.create(u)
        const o: Order = {
                // id: ,
                status: completed,
                user_id: user.id as Number
            }
        const order = await orderStore.create(o)
        orderID = order.id as Number

        const product = await productStore.create(p)
        productID = product.id as Number
    })

    const op: OrderProduct = {
        order_id: orderID,
        product_id: productID,
        quantity: 99
    }

    let OPID: Number = -1

    

    it("should have an index method",  () => {
        expect(store.index).toBeDefined();
    });

    it("should have a show method",  () => {
        expect(store.show).toBeDefined();
    });

    it("should have a showByOrderID method",  () => {
        expect(store.showByOrderID).toBeDefined();
    });



    it("should have a getID method",  () => {
        expect(store.getID).toBeDefined();
    });

    it("should have a getCurrentQuantity method",  () => {
        expect(store.getCurrentQuantity).toBeDefined();
    });

    it("should have a updateQuantity method",  () => {
        expect(store.updateQuantity).toBeDefined();
    });



    it("index method should return a list of order_products", async() => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("getID method should -1 if not found", async() => {
        const result = await store.getID(`${orderID}`, `${productID}`);
        expect(result).toEqual(-1);
    });




    it("getID method should return correct value", async() => {
        const result = await store.getID(`${orderID}`, `${productID}`);
        OPID = result
        expect(result).toEqual(1);
    });



    it("show method should return the correct product", async() => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            order_id: orderID,
            product_id: productID,
            quantity: 99
        })
    })

    it("showByOrderID method should return the correct product", async() => {
        const result = await store.showByOrderID(`${op.order_id}`);
        expect(result).toEqual([{
            id: 1,
            order_id: orderID,
            product_id: productID,
            quantity: 99
        }])
    })

    it("getCurrentQuantity method should return the correct quantity", async() => {
        const result = await store.getCurrentQuantity(`${OPID}`);
        expect(result).toEqual(op.quantity)
    })

    it("updateQuantity method should return the correct quantity", async() => {
        const result =  await store.updateQuantity(`${OPID}`,`${709}`)
        expect(result.quantity).toEqual(709)
    })


})