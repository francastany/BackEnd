const express = require("express");
const app = express();
let path = require("path");
let { Server: HttpServer } = require("http");
let serverRoutes = require("./routes");
let Socket = require("./utils/sockets");

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

serverRoutes(app);

let httpServer = new HttpServer(app);

let socket = new Socket(httpServer);
socket.init();

httpServer.listen(PORT, () => console.log(`http://localhost:${PORT}`));

