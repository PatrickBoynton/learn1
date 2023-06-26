import express from 'express'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()
import { connectDB } from './config/db.js'
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT

connectDB()

const app = express()

app.get('/', (req, res, next) => {
  res.send('API IS RUNNING')
})

app.use('/api/product/', productRoutes)
app.use('/api/user/', userRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => console.log(`Go to http://localhost:${port}`))
