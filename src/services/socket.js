function onAnyEvent(socket) {
  socket.onAny(event => console.log(`event : ${event}`));
}

function onEnterRoom(socket) {
  socket.on('enter_room', message => {
    const { roomName } = message;
    socket.join(roomName)
    socket.emit('enter_success');
    socket.to(roomName).emit('welcome', { nickname: socket.nickname });
  });
}

function onLeftRoom(socket) {
  socket.on('disconnecting', _ => {
    socket.rooms.forEach(room => {
      socket.to(room).emit('bye', { nickname: socket.nickname });
    });
  });
}

function onNickname(socket) {
  socket.on('nickname', message => {
    const { nickname } = message;
    socket['nickname'] = nickname;
  });
}

function onNewChat(socket) {
  socket.on('new_chat', message => {
    const { roomName, newChat } = message;
    socket
      .to(roomName)
      .emit('new_chat', { nickname: socket.nickname, newChat });
  });
}

export default {
  onAnyEvent,
  onEnterRoom,
  onLeftRoom,
  onNickname,
  onNewChat,
};