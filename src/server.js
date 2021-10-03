import http from 'http';
import ws from 'ws';
import express from 'express';
import socketStore from './stores/socketStore';
import { ChatMessage } from './models/ChatMessage';
import { v4 } from 'uuid';

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use('/public', express.static(`${__dirname}/public`));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on("connection", (socket) => {
  socket['nickname'] = 'anonymous';
  socket['id'] = v4();
  socketStore.save(socket);

  console.log('Connected to Client!');
  
  socket.on('close', () => console.log('Disconnected from Client!'));

  socket.on('message', (message) => {
    const parsedMessage = parseMessage(message);
    const targetNickname = socket.nickname;

    switch(parsedMessage.type) {
      case 'chat': {
        const sockets = socketStore.find();
        sockets.forEach((s) => {
          const chatMessage = new ChatMessage(
            targetNickname, 
            parsedMessage.type, 
            parsedMessage.payload
          );
          s.send(JSON.stringify(chatMessage));
        });
        break;
      }
      case 'nickname': {
        socket['nickname'] = parsedMessage.payload;
        socketStore.update(socket);
        break;
      }
    }
  });
});


server.listen(3000, () => console.log('Server is running on Port 3000'));

function parseMessage(message) {
  return JSON.parse(message);
}