import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

// handlers
const index = async (req:Request, res:Response) => {
    const users = await store.index()
    // @ts-ignore
    res.status(200).json(users)
}

const show = async (req:Request, res:Response) => {
    // @ts-ignore
    const user = await store.show(req.params.id)
    // @ts-ignore
    res.status(200).json(user)
}

const create = async (req:Request, res:Response) => {
    try {
        const user:User = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            password: req.body.password
        }

        const newUser = await store.create(user)
        res.json(newUser)
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
const user_routes = (app: Express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users/:id', destroy)
}

export default user_routes