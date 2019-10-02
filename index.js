const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 1998
// const server = require('http').createServer(app)
const app = express()
app.use(bodyParser.json())
app.use(cors())
const server = http.createServer(app)
const io = socketIO(server)

var arrMsg = []
var userCount = 0

app.io = io
app.arrMsg = arrMsg

app.get('/', (req,res) => {
    res.status(200).send('<h1>Selamat datang di API Socket.IO</h1>')
})

const { chatRouter, userRouter } = require('./routers')

app.use('/chat', chatRouter)
app.use('/user', userRouter)

io.on('connection', socket => {
  console.log('User connected')
  userCount+=1;
  io.emit('user connected', userCount)
  
  // io emit = broadcast ke semua socket
  // socket emit = broadcast ke socket spesifik
  // socket on = listen to an event

  socket.on('disconnect', () => {
    console.log('user disconnected')
    userCount--;
    io.emit('user connected', userCount)
  })
})


server.listen(port, () => console.log(`Listening on port ${port}`))