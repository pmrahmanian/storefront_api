import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../middlewares/verifyAuthToken'

const store = new ProductStore()

// handlers
const index = async (req:Request, res:Response) => {
    const products = await store.index()
    // @ts-ignore
    res.status(200).json(products)
}

const show = async (req:Request, res:Response) => {
    // @ts-ignore
    const product = await store.show(req.params.id)
    // @ts-ignore
    res.status(200).json(product)
}

const create = async (req:Request, res:Response) => {
    try {
        const product:Product = {
            name: req.body.name, 
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
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
const product_routes = (app: Express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.delete('/products/:id', verifyAuthToken, destroy)
}

export default product_routes