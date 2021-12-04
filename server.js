require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => { console.log(`Running on ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`) })