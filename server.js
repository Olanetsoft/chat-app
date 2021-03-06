const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getUsersCount } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static file
app.use(express.static(path.join(__dirname, 'public')));

// bot name
const botName = 'Admin BOT'

// Run when a client connect
io.on('connection', socket => {

    socket.on('joinRoom', ({ username }) => {
        const user = userJoin(socket.id, username);

        // welcome current user
        socket.emit('message', formatMessage(botName.toUpperCase(), `${user.username.toUpperCase()} Welcome to live chat 🎉🎉🎉🎉🎉🎉`));

        // Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName.toUpperCase(), `${user.username.toUpperCase()} joined the chat`));

    });

    // Listen for chat Message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.emit('message', formatMessage(user.username.toUpperCase(), msg));
    });


    // Runs when client disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.emit(
                'message',
                formatMessage(botName.toUpperCase(), `${user.username.toUpperCase()} has left the chat`));
        }
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});