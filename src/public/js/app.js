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
  socket.emit('enter_room', { payload: input.value });
  roomName = input.value;
  input.value = '';
}

socket.on('enter_success', socket => {
  showRoom();
})

roomForm.addEventListener('submit', onSubmit);