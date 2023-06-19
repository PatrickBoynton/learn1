import express from 'express'

const port = 8000 || process.env.PORT

const app = express()

app.get('/', (req, res, next) => {
    res.send('API IS RUNNING')
})

app.listen(port, () => console.log(`Go to http://localhost:${port}`))
