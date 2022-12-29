import config from "./options/config.js";
import ClientSQL from './sql.js';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import express from "express";
import * as handlebars from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const PORT = 8080;
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const __dirname = dirname(fileURLToPath(import.meta.url));
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/views/layout",//Ruta a plantilla principal
    partialsDir: __dirname + "/public/views/partials/" //Ruta a plantillas parciales
});

//Resources
const products = new ClientSQL(config.mariaDB, 'products', './resources/products.json');
const messages = new ClientSQL(config.sqlite3, 'messages', './resources/messages.json');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', './public/views');

app.get('/', (req, res, next) => {
    res.render('index', {})
})

// io functions
io.on('connection', async socket => {
    socket.emit('loadProducts', await products.getAll());
    socket.emit('loadMessages', await messages.getAll());
    socket.on('addProduct', async product => {
        await products.saveProduct(product);
        io.emit('loadProducts', await products.getAll());
    })
    socket.on('sendMessage', async message => {
        await messages.saveMessage(message);
        io.emit('loadMessages', await messages.getAll());
    });
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
connectedServer.on(
    'error', error => console.log(`Error en el servidor : ${error}`)
);