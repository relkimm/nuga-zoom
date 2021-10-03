class SocketStore { 
  _sockets = [];  

  save(socket) {
    this._sockets.push(socket);
  }

  find() {
    return this._sockets;
  }

  update(socket) {
    const newSockets = this._sockets.map(s => {
      console.log('s.id :: ', s.id);
      console.log('soket.id :: ', socket.id);
      if(s.id === socket.id) {
        s = socket;
      }
      return s;
    });
    this._sockets = newSockets;
  }
}

const socketStore = new SocketStore();
export default socketStore;