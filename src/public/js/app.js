const url = `ws://${window.location.host}`;
const socket = new WebSocket(url);

socket.addEventListener('open', () => console.log('Connected to Server!'));
socket.addEventListener('message', message => {
  const liElement = document.createElement('li');
  liElement.innerText = message.data;
  const chatList = document.querySelector('#chat-list');
  chatList.appendChild(liElement);
});
socket.addEventListener('close', () => console.log('Disconnected from Server!'));



const onSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector('#chat-input');
  socket.send(input.value);
  input.value = '';
}

const chatForm = document.querySelector('#chat-form');
chatForm.addEventListener('submit', onSubmit);