const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    //Sends welcome message on new connection
    socket.emit('message', 'Welcome!')

    //Brodcasts message to all connected users when new user joins chat
    socket.broadcast.emit('message', 'A new user has joined the chat.')

    //Sends message to all connected users from user
    socket.on('sendMessage', (data) => {
        io.emit('message', data)
    })

    //Sends message to all connected users when user disconnected from chat
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.')
    })

    //Sends Location to all connected users when user shares location
    socket.on('sendLocation', (sendLocation) => {
        io.emit('message', `https://google.com/maps?q=Sha${sendLocation.lat},${sendLocation.long}`)
    })

})

server.listen(port, () => {
    console.log(`Server is up at ${port}`);
})
