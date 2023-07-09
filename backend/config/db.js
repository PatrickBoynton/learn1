import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI)
    console.log(`MongoDB connected to ${conn.connection.host}`)
  } catch (error) {
    console.error(`ERROR: ${error.message}`)
    process.exit(1)
  }
}
