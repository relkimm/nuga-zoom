import socketService from './socket';

let io = undefined;

function init(ioInstance) {
  io = ioInstance;
  io.on('connection', socket => {
    socketService.init(socket);
  });
}

function getIO() {
  if(io === undefined) {
    throw new Error('cannot get IO before init ioService');
  }
  return io;
}

function emitRoomChange() {
  if(io !== undefined) {
    const publicRooms = getPublicRooms();
    io.sockets.emit('room-change', { rooms: publicRooms });
  }
}

function getPublicRooms() {
  if(io === undefined) {
    return [];
  }

  const { sids, rooms } = io.sockets.adapter;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if(sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

export default {
  init,
  getIO,
  emitRoomChange,
  getPublicRooms,
}