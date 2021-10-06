const socket = io();

const welcome = document.querySelector('#welcome');
const roomForm = welcome.querySelector('form');
const room = document.querySelector('#room');
const chatForm = room.querySelector('form');

let roomName;
room.hidden = true;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
}

function addChat(chat) {
  const chatList = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = chat;
  chatList.appendChild(li);
}


function onEnterSubmit(event) {
  event.preventDefault();
  const input = roomForm.querySelector('input');
  socket.emit('enter_room', { roomName: input.value });
  roomName = input.value;
  input.value = '';
}

function onChatSubmit(event) {
  event.preventDefault();
  const input = chatForm.querySelector('input');
  socket.emit('new_chat', { roomName, newChat: input.value });
  addChat(`You : ${input.value}`);
  input.value = '';
}

socket.on('new_chat', message => {
  addChat(message.newChat);
});

socket.on('enter_success', _ => {
  showRoom();
})

socket.on('welcome', _ => {
  addChat('someone joined!');
});

socket.on('bye', _ => {
  addChat('someone left!');
});


roomForm.addEventListener('submit', onEnterSubmit);
chatForm.addEventListener('submit', onChatSubmit);