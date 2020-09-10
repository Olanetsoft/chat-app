const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');


const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static file
app.use(express.static(path.join(__dirname, 'public')));

// bot name
const botName = 'Admin BOT'

// Run when a client connect
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        // welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to live chat'));

        // Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName, 'A user joined the chat'));

    });

    // Listen for chat Message
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });


    // Runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user had left the chat'));
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});