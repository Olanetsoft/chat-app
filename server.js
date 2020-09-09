const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static file
app.use(express.static(path.join(__dirname, 'public')));


// Run when a client connect
io.on('connection', socket =>{
    socket.emit('message', 'Welcome to live chat');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user joined the chat');

    // Runs when client disconnect
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user had left the chat')
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});