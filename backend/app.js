import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3001

const app = express()

app.get('/', (req, res, next) => {
    res.send('API IS RUNNING')
})

app.get('/api/product', (req, res, next) => {
    res.json(products)
})

app.get('/api/product/:id', (req, res, next) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.listen(port, () => console.log(`Go to http://localhost:${port}`))
