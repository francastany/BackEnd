import config from "./options/config.js";
import ClientSQL from './sql.js';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import express from "express";
import * as handlebars from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {promises as fs} from 'fs';
import knex from 'knex';


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
// const messages = new ClientSQL(config.sqlite3, 'messages', './resources/messages.json');


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
    // socket.emit('loadMessages', await messages.getAll());
    socket.on('addProduct', async product => {
        await products.saveProduct(product);
        io.emit('loadProducts', await products.getAll());
    })
/*     socket.on('sendMessage', async message => {
        await messages.saveMessage(message);
        io.emit('loadMessages', await messages.getAll());
    }); */
});


const arrProducts = JSON.parse(await fs.readFile('./resources/products.json'));
console.log(arrProducts);
// const arrMessages = JSON.parse(await fs.readFile('./resources/messages.json'));

//Using mariaDB for products DataBase
try {
    const knexMariaDB = knex(config.mariaDB);
    await knexMariaDB.schema.dropTableIfExists('products');
    await knexMariaDB.schema.createTable('products', table => {
        table.increments('id'),
        table.string('name'),
        table.integer('price'),
        table.string('src'),
        table.integer('stock')
    })
    console.log(`Empty table created.`);
    await knexMariaDB('products').insert(arrProducts)
        .then(() => console.log('Products added.'))
        .catch(err => {console.log(err); throw err})
        .finally(() => {
            knexMariaDB.destroy();
            console.log('Connection closed.');
        });

} catch(error) {
    console.log(error);
    throw error;
}
/* //Using SQLite3 for messages DataBase
try {
    const knexSQLite = knex(config.sqlite3);
    await knexSQLite.schema.dropTableIfExists('messages');
    await knexSQLite.schema.createTable('messages', table => {
        table.string('date'),
        table.string('name'),
        table.string('email').notNullable(),
        table.string('text')
    });
    await knexSQLite('messages').insert(arrMessages)
        .then(() => {console.log('Messages added.')})
        .catch(err => {console.log(err); throw err})
        .finally(() => {
            knexSQLite.destroy();
        });
} catch (error) {
    console.log(error);
    throw error;
}
 */

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
connectedServer.on(
    'error', error => console.log(`Error en el servidor : ${error}`)
);