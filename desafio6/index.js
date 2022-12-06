const PORT = 8080;
const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
// const serverRoutes = require("./routes");
const {Server: HttpServer} = require('http');
const httpServer = new HttpServer(app);

const Products = require('./resources/products/products.js');
const products = new Products('./resources/products/products.txt');
const Messages = require('./resources/messages/messages.js');
const messages = new Messages("./resources/messages/messages.txt");

const {Server: IOServer} = require('socket.io');
const io = new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/views/layout",//Ruta a plantilla principal
    partialsDir: __dirname + "/public/views/partials/" //Ruta a plantillas parciales
});
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
        await messages.save(message);
        io.emit('loadMessages', await messages.getAll());
    });
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
connectedServer.on(
    'error', error => console.log(`Error en el servidor : ${error}`)
)