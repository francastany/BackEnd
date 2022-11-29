let {Server: SocketIO} = require("socket.io");

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        } else {
            Socket.instancia = this;
            this.io = new SocketIO(http);
            this.mensajes = [];
        }
    }
    init(){
        try {
            this.io.on('connection', socket =>{
                console.log('Usuario Conectado');
                socket.emit('init', socket.id);
                socket.on("keyup", data => {
                    this.io.sockets.emit("fillP", data)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Socket;