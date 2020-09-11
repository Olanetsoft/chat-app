const users = [];

// Join user to chat
function userJoin(id, username){
    const user = {id, username};
    users.push(user);

    return user;
};

// User leaves chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index != -1){
        return users.splice(index, 1);
    }
}

// Get Current User
function getCurrentUser(id){
    return users.find(user => user.id == id);
}

module.exports = {
    userJoin, getCurrentUser
}