import { Request, Response, NextFunction } from 'express'
type Callback = (req: Request, res: Response, next: NextFunction) => any
export const asyncHandler =
  (fn: Callback) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
