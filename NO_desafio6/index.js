//Express
const express = require("express");
const app = express();
const PORT = 3001;

let { Server: HttpServer } = require("http");
let serverRoutes = require("./routes");

let Socket = require("./utils/sockets");

//Handlebars
let hbs = require("express-handlebars");
//App settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('hbs', hbs.engine());
app.set("views", "./views/hbs");
app.set("view engine", "hbs");

serverRoutes(app);

let httpServer = new HttpServer(app);

let socket = new Socket(httpServer);
socket.init();

//App Listen
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));