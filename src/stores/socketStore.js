class SocketStore { 
  _sockets = [];  

  save(socket) {
    this._sockets.push(socket);
  }

  find() {
    return this._sockets;
  }
}

const socketStore = new SocketStore();
export default socketStore;