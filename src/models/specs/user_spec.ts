import { User, UserStore } from '../user'

const store = new UserStore()

describe("User Model",  () => {
    const u: User = {
        // id: ,
        firstName: "Pedd",
        lastName: "Matty",
        password: "testPassword"
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

    it("should have a delete method",  () => {
        expect(store.delete).toBeDefined();
    });


    it("index method should return a list of users", async() => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should return new user", async() => {
        const result = await store.create(u);
        expect(result).toEqual({id: 1, ...u});
    });

    it("create method should have inserted new user into database", async() => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });

    it("show method should return the correct user", async() => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            firstName: "Pedd",
            lastName: "Matty",
            password: "testPassword"
        })
    })

    it("index method should return the correct result array", async() => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            firstName: "Pedd",
            lastName: "Matty",
            password: "testPassword"
        }])
    })

    it("delete method should delete user", async() => {
        await store.delete('1')
        const index = await store.index()
        expect (index.length).toEqual(0)

    })


})
