import dotenv from 'dotenv'
import products from './data/products'
import users from './data/users'
import Product from './models/productModel'
import User from './models/userModel'
import Order from './models/orderModel'
import { connectDB } from './config/db'

dotenv.config()

connectDB()

const importData = async (): Promise<void> => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createUsers = await User.insertMany(users)

    const adminUser = createUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data imported!')

    process.exit()
  } catch (error: any) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

const destroyData = async (): Promise<void> => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
  } catch (error: any) {
    console.error(error?.message)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
