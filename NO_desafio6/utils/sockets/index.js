let {Server: SocketIO} = require("socket.io");

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        } else {
            Socket.instancia = this;
            this.io = new SocketIO(http);
            this.productos = [];
            this.mensajes = [];
            this.usuarios = [];
        }
    }
    init(){
        try {
            this.io.on("connection", socket => {
                console.log("User connected!");
                this.io.sockets.emit("init", this.productos);

                socket.on("addProduct", data =>{
                    console.log(data);
                    this.productos.push({
                        ...data
                    })

                    this.io.sockets.emit("loadProducts", this.productos);
                })
                
            })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Socket;