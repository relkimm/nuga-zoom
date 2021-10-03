const url = `ws://${window.location.host}`;
const socket = new WebSocket(url);

socket.addEventListener('open', () => console.log('Connected to Server!'));
socket.addEventListener('message', (message) => console.log(message.data));
socket.addEventListener('close', () => console.log('Disconnected from Server!'));

setTimeout(() => {
  socket.send('hello from Client :)');
}, 5000);