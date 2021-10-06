import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import loader from './loaders';
import socketService from './services/socket';


async function startHttpServer() {
  const app = express();
  await loader(app);
  const server = http.createServer(app);
  server.listen(3000, () => console.log('Server is running on Port 3000'));
  return server;
}

async function startWsServer(httpServer) {
  const io = SocketIO(httpServer);
  
  io.on('connection', socket => {
    socketService.onAnyEvent(socket);
    socketService.onEnterRoom(socket);
    socketService.onLeftRoom(socket);
    socketService.onNewChat(socket);
  });
}

startHttpServer().then(httpServer => {
  startWsServer(httpServer);
});