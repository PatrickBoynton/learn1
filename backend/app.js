import express from 'express'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/db.js'

const port = process.env.PORT

connectDB()

const app = express()

app.get('/', (req, res, next) => {
    res.send('API IS RUNNING')
})

app.use('/api/product/', productRoutes)

app.listen(port, () => console.log(`Go to http://localhost:${port}`))
