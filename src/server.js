import http from 'http';
import ws from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use('/public', express.static(`${__dirname}/public`));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on("connection", (socket) => {
  console.log('Connected to Client!');
  socket.on('close', () => console.log('Disconnected from Client!'));
  socket.on('message', (message) => socket.send(message.toString('utf8')));
});


server.listen(3000, () => console.log('Server is running on Port 3000'));