export const errorCondition = (res, num, msg) => {
  res.status(num)
  throw new Error(msg)
}
