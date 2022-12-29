//Importing tables from .JSON files
import {promises as fs} from 'fs';
import config from '../options/config.js';
import knex from 'knex';

console.log('Running tables.js');

const arrProducts = JSON.parse(await fs.readFile('./resources/products.json'));
const arrMessages = JSON.parse(await fs.readFile('./resources/messages.json'));

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
    console.log(`Empty table`);
    await knexMariaDB('products').insert(arrProducts)
        .then(() => console.log('Products added.'))
        .catch(err => {console.log(err); throw err})
        .finally(() => {
            knexMariaDB.destroy();
        });
} catch(error) {
    console.log(error);
    throw error;
}
//Using SQLite3 for messages DataBase
try {
    const knexSQLite = knex(config.sqlite3);
    await knexSQLite.schema.dropTableIfExists('messages');
    await knexSQLite.schema.createTable('messages', table => {
        table.string('date'),
        table.string('name'),
        table.string('email').notNullable(),
        table.string('text').notNullable()
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


