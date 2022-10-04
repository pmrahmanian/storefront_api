import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

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

// routes
const order_routes = (app: Express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.delete('/orders/:id', destroy)
}

export default order_routes