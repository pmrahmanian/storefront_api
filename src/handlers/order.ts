import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

import verifyAuthToken from '../middlewares/verifyAuthToken'
import isOrderOpen from '../middlewares/isOrderOpen'

const store = new OrderStore()

// handlers
const index = async (req:Request, res:Response) => {
    const user_id = req.params.user
    const status = req.params.status

    // @ts-ignore
    let orders;

    if (user_id) {
        if (status === 'complete') {
            orders = await store.completedOrdersForUser(user_id)
        } else {
            orders = await store.currentOrderForUser(user_id)
        }
    } else {
        orders = await store.index()
    }
    // @ts-ignore
    res.status(200).json(orders)
}

const show = async (req:Request, res:Response) => {
    // @ts-ignore
    const order = await store.show(req.params.id)
    // @ts-ignore
    res.status(200).json(order)
}

const create = async (req:Request, res:Response) => {
    try {
        const order:Order = {
            status: req.body.status, 
            user_id: req.body.user_id
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const destroy = async (req:Request, res:Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const addProduct = async (req:Request, res:Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

// routes
const order_routes = (app: Express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders/:id', verifyAuthToken, destroy)
    app.post('/orders/:id/products', verifyAuthToken, isOrderOpen, addProduct)
}

export default order_routes