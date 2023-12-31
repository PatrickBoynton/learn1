import express, { Request, Response } from 'express'
import productRoutes from './routes/productRoutes'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware'
dotenv.config()
import { connectDB } from './config/db'
import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser'
import orderRoutes from './routes/orderRoutes'
import uploadRoutes from './routes/uploadRoutes'
import path from 'path'

const port = process.env.PORT || Math.round(Math.random() * (5000 - 8000))

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (_: Request, res: Response) => {
  res.send('API IS RUNNING')
})

app.use('/api/product/', productRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/order/', orderRoutes)
app.use('/api/upload/', uploadRoutes)

// TODO add the client id to the .env file.
app.get('/api/config/paypal', (_: Request, res: Response) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => console.log(`Go to http://localhost:${port}`))
