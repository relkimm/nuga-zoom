import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import loader from './loaders';
import ioService from './services/io';
import { SERVER_PORT } from './config';


async function startHttpServer() {
  const app = express();
  await loader(app);
  const server = http.createServer(app);
  server.listen(SERVER_PORT, () => console.log('Server is running on Port 3000'));
  return server;
}

async function startWsServer(httpServer) {
  const io = await SocketIO(httpServer);
  ioService.init(io);
}

startHttpServer().then(httpServer => {
  startWsServer(httpServer);
});