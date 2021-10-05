import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import loader from './loaders';


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
    socket.onAny(event => console.log(`event : ${event}`));
    socket.on('enter_room', (message) => {
      const { payload } = message;
      socket.join(payload);
      socket.emit('enter_success', { payload: 'success' });
    });
  })
}

startHttpServer().then(httpServer => {
  startWsServer(httpServer);
});