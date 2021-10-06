function onAnyEvent(socket) {
  socket.onAny(event => console.log(`event : ${event}`));
}

function onEnterRoom(socket) {
  socket.on('enter_room', message => {
    const { roomName } = message;
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
    socket.emit('enter_success');
  });
}

function onLeftRoom(socket) {
  socket.on('disconnecting', _ => {
    socket.rooms.forEach(room => {
      socket.to(room).emit('bye');
    });
  });
}

function onNewChat(socket) {
  socket.on('new_chat', message => {
    const { roomName, newChat } = message;
    socket.to(roomName).emit('new_chat', { newChat });
  });
}

export default {
  onAnyEvent,
  onEnterRoom,
  onLeftRoom,
  onNewChat,
};