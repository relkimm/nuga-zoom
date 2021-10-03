const url = `ws://${window.location.host}`;
const socket = new WebSocket(url);

socket.addEventListener('open', () => console.log('Connected to Server!'));
socket.addEventListener('message', (message) => console.log(message.data));
socket.addEventListener('close', () => console.log('Disconnected from Server!'));

const chatList = document.querySelector('#chat-list');
const chatForm = document.querySelector('#chat-form');


const onSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector('#chat-input');
  socket.send(input.value);
  input.value = '';
}

chatForm.addEventListener('submit', onSubmit);