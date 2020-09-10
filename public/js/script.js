const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('gbefun');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();


// Join Chat Room
socket.emit('joinRoom', {
    username, room
});

// Output message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message);

    // scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get chat message
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage', msg)

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('msg_cotainer_send');
    div.innerHTML = ` ${message.text}
    <span class="msg_time_send">${message.username} ${message.time}</span>`;
    document.getElementById('gbefun').appendChild(div);
};
