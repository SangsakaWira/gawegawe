// import
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route')
const port = process.env.PORT

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
// use db
require('./db/db')

app.use((req, res, next) => {
    console.log(`${new Date()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(userRouter)

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.use((req, res, next) => {
    res.status(404).send('We think you are lost')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
