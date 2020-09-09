const chatForm = document.getElementById('')

const socket = io();

socket.on('message', message => {
    console.log(message)
})