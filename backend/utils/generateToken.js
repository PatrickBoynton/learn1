import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SERCRET, {
    expiresIn: '365d',
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    //  365 days in milliseconds
    maxAge: 31536000000,
  })
}
