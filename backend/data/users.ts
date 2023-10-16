import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/modelInterfaces'

const users: IUser[] = [
  {
    name: 'Admin1',
    email: 'admin@gametronics.com',
    password: bcrypt.hashSync('safepass1', 10),
    isAdmin: true,
  },
  {
    name: 'JPBIII',
    email: 'jpb3@email.com',
    password: bcrypt.hashSync('safepass1', 10),
    isAdmin: false,
  },
  {
    name: 'tyrion101',
    email: 'tyrion101@email.com',
    password: bcrypt.hashSync('safepass1', 10),
    isAdmin: false,
  },
]

export default users
