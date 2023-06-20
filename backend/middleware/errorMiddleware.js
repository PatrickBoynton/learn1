export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === 'Cast Error' && err.kind === 'ObjectId') {
    message = 'Resource not found.'
    statusCode = 404
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '...' : err.stack,
  })
}
