const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.get('/', (req,res) => {
    res.send("<h1>server works</h1>")
})

const { dbURL } = require('./config/dbConfig')

const userRouter = require('./routes/router')

app.use('/', userRouter)

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`App running in port ${PORT}`))