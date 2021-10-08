const socket = io();

const welcome = document.querySelector('#welcome');
const roomForm = welcome.querySelector('form');
const room = document.querySelector('#room');
const nicknameForm = room.querySelector('#nickname-form');
const chatForm = room.querySelector('#chat-form');

let roomName;
room.hidden = true;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;

  nicknameForm.addEventListener('submit', onNicknameSubmit);
  chatForm.addEventListener('submit', onChatSubmit);
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

function onNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.emit('nickname', { nickname: input.value });
}

function onChatSubmit(event) {
  event.preventDefault();
  const input = chatForm.querySelector('input');
  socket.emit('new_chat', { roomName, newChat: input.value });
  addChat(`You : ${input.value}`);
  input.value = '';
}

socket.on('new_chat', message => {
  addChat(`${message.nickname} : ${message.newChat}`);
});

socket.on('enter_success', _ => {
  showRoom();
})

socket.on('welcome', message => {
  addChat(`${message.nickname} joined!`);
});

socket.on('bye', message => {
  addChat(`${message.nickname} left!`);
});

socket.on('room-change', message => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  
  message.rooms.forEach(roomName => {
    const room = document.createElement('li');
    room.innerText = roomName;
    roomList.append(room);
  });
});

roomForm.addEventListener('submit', onEnterSubmit);
