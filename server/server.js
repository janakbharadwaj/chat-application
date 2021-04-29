const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors')

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  getGroupUsers
} = require('./utils/users');

const app = module.exports = express();
app.use(cors())

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

require('./routes')(app);

const botName = "JB chat application"

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on('joinGroup', ({ username, group }) => {
    console.log("Join group")
    const user = userJoin(socket.id, username, group);
    socket.join(user.group);

    // Welcome current user
    socket.emit('message', formatMessage(botName, `Welcome to ${group}`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.group)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and group info
    io.to(user.group).emit('groupUsers', {
      group: user.group,
      users: getGroupUsers(user.group)
    });

    // Listen for chatMessage
    socket.on('chatMessage', message => {
      console.log("message", message)
      const user = getCurrentUser(socket.id);
      console.log("user", user)

      io.to(user.group).emit('message', formatMessage(user.username, message));
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected getApiAndEmit");
    });
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log("Listening on 3001"));
        
        
        