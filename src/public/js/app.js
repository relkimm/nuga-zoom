const socket = io();

const welcome = document.querySelector('#welcome');
const roomForm = welcome.querySelector('form');

const room = document.querySelector('#room');
room.hidden = true;
const chatList = room.querySelector('ul');
const chatForm = room.querySelector('form');

let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
}

const onSubmit = (event) => {
  event.preventDefault();
  const input = roomForm.querySelector('input');
  /* send */
  socket.emit('enter_room', { payload: input.value });
  /* clear */
  roomName = input.value;
  input.value = '';
}

socket.on('enter_success', socket => {
  showRoom();
})

roomForm.addEventListener('submit', onSubmit);



// const url = `ws://${window.location.host}`;
// const socket = new WebSocket(url);

// socket.addEventListener('open', () => console.log('Connected to Server!'));
// socket.addEventListener('close', () => console.log('Disconnected from Server!'));

// socket.addEventListener('message', message => {
//   const chatItem = getChatItem(parseMessage(message));
//   if(chatItem === undefined) {
//     return;
//   }
//   appendChatItem(chatItem);
// });

// const onSubmit = (event) => {
//   event.preventDefault();
//   const input = document.querySelector('#chat-input');
//   socket.send(makeMessage('chat', input.value));
//   input.value = '';
// }

// const onNickSubmit = (event) => {
//   event.preventDefault();
//   const input = document.querySelector('#nick-input');
//   socket.send(makeMessage('nickname', input.value));
// }

// const chatForm = document.querySelector('#chat-form');
// chatForm.addEventListener('submit', onSubmit);
// const nickForm = document.querySelector('#nick-form');
// nickForm.addEventListener('submit', onNickSubmit);

// function makeMessage(type, payload) {
//   const message = { type, payload };
//   return JSON.stringify(message);
// }

// function parseMessage(message) {
//   return JSON.parse(message.data);
// }

// function getChatItem(parsedMessage) {
//   return parsedMessage.type === 'chat' ? `${parsedMessage.nickname} : ${parsedMessage.payload}` : undefined;
// }

// function appendChatItem(chatItem) {
//   const liElement = document.createElement('li');
//   liElement.innerText = chatItem;

//   const chatList = document.querySelector('#chat-list');
//   chatList.append(liElement);
// }