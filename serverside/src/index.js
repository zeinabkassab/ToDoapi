const express = require('express')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')

// connection to db 

require('./db/mongoose')

const app = express()

// Parse automatic
app.use(express.json())

// use userRouter
app.use(userRouter)
app.use(todoRouter)

const port = 3000


/////////////////////////////////////////////////////////////////////////////////
app.listen(port,()=>{console.log('Server is running')})
