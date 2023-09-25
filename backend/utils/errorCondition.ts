import { Response } from 'express'

export const errorCondition = (res: Response, num: number, msg: string) => {
  res.status(num)
  throw new Error(msg)
}
