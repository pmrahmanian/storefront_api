# Storefront_API

This service is a RESTful API for a simplified ecommerce storefront. It enables user, product, and order creation and handling. The API has a Postgres Database to persist the data.

This project was developed as part of my Udacity Full Stack with Javascript Nanodegree program.


## Getting Started
---

### Install Technologies and Dependencies
This service is built the following main technologies:
* Typescript
* Node.js / Express.js
* Jasmine / Supertest
* PostgreSQL

For a full list of dependencies, see the  `package.json` file.

Once you have cloned the repo, install dependencies by running `npm install` in your terminal.

### Starting the Server
To run the development server with nodemon run `npm run start`. Nodemon will restart the server upon new changes during development.

To run the built server, first compile the code with `npm run build`,
then start the server with `node dist .` .

### Further Available Developer Scripts
#### Compiling
You can build the production server by running `npm run build` to compile the typescript.

#### Testing
An extensive test suite is provided for each endpoint and method, powered by Jasmine and Supertest. You can run the test suite with the `npm run test` script. This script first builds the project then runs the test suite so that tests are performed on compiled code.

#### Maintenance
This project has ESLint and Prettier installed for code maintenance. You can run these with `npm run prettier` then lint with `npm run lint`.


## Usage
---
The development server will listen on port 3000, base URI:
`http://localhost:3000/`

There are four tables in the database. 
* A **Users** table to register the store users.
* A **Products** table to register product offerings.
* A **Orders**  table to log orders by users and keep track of status.
* A **Order_Products** join table to enable cart functionality and associate products to orders.


### Users:

#### Users Table Data Shape
- id (number)
- firstName (string)
- lastName (string)
- password_digest (string)

The Users data shape holds name information as well as a password digest. For added security, passwords are salt, peppered and hashed a number of times in before being saved as a password digest. This is powered by the bcrypt package.

#### Available Users API Endpoints
* Index: `GET ../users` [token required]
This returns a list of all user objects.

* Show: `GET ../users/:id` [token required]
This returns a single user object.

* Create: `POST ../users` [token required]
This creates a new user, persists that user information to the Users table, signs a JWT & returns that token.
The request body needs to contain the user details below:
    `{
        firstName: <string>,
        lastName: <string>,
        password: <string>
    }`

* Delete: `DELETE ../users/:id` [token required]
This deletes a user from the database and returns that User object.

* Authenticate: `POST ../users/authenticate`
This endpoint takes in a user object, authenticates the user, signs a JWT and returns that token.
The request body needs to contain the user details below:
    `{
        firstName: <string>,
        lastName: <string>,
        password: <string>
    }`


### Products:

#### Products Table Data Shape
- id (number)
- name (string)
- price (number)
- category (string)

The Product data shape holds name, price and category information for the products in the store.

#### Available Products API Endpoints

* Index: `GET ../products`
This returns a list of all product objects.

* Show: `GET ../products/:id`
This returns a single product object.

* Create: `POST ../products` [token required]
This creates a new product, persists that product to the products table in the database, and returns the new Product object.
The request body needs to contain the user details below:
    `{
        name: <string>,
        price: <number>,
        category: <string>
    }`

* Delete: `DELETE ../products/:id` [token required]
This deletes a product from the database and returns that Product object.

### Orders:

#### Orders Table Data Shape
- id (number)
- status (string)
- user_id (string, foreign key to users table)

#### Order_Products JOIN Table Data Shape
- id (number)
- order_id (string, foreign key to orders table)
- product_id (string, foreign key to products table)
- quantity (number)

#### Available Orders API Endpoints
* Index: `GET ../orders/{:user_id}.{:status}`[token required]
By default, this returns a list of all orders objects. Optionally a user_id can be provided to get orders for a specific user. By default it will get the current order for the user, but the optional status parameter could be set to 'complete' to return the list of all completed orders for the user.

* Show: `GET ../orders/:id` [token required]
This returns a single order object.

* Create: `POST ../orders` [token required]
This creates a new order, persists that order to the orders table in the database, and returns the new Order object.
The request body needs to contain the order details below:
    `{
        status: <string>,
        user_id: <string>
    }`

* Delete: `DELETE ../orders/:id` [token required]
This deletes an order from the database and returns that Order object.

* AddProduct: `POST ../orders/:id/products` [token required]
This adds a product to an existing order, adding a record to the order_products table and returning the Order_Product object. This route utilizes a middleware to check if the order has an open status. Products can only be added to open orders.
The request body needs to contain the product details below:
    `{
        product_id: <string>,
        quantity: <string | number>
    }`

## Roadmap
[ ] 


## Author
Pedram Rahmanian
&copy; 2022