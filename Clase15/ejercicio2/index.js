//Importamos dependencias
import ClientSQL from './sql.js';
import { options } from './options/mariaDB.js';

//Instanciamos const
const sql = new ClientSQL(options);

//Creamos tabla si no esiste
sql.createTable()
    .then(() => {
        console.log('Table Created');

        //Creamos artículos y los listamos
        const articles = [
            { nombre: 'Leche', codigo: 'AB-12', precio: 207.6, stock: 24 },
            { nombre: 'Harina', codigo: 'AB-23', precio: 150, stock: 60 },
            { nombre: 'DDL', codigo: 'AB-34', precio: 250.5, stock: 112 },
            { nombre: 'Chocolate', codigo: 'AB-45', precio: 360, stock: 78 },
            { nombre: 'Huevos', codigo: 'AB-56', precio: 180, stock: 14 }
        ];
        return sql.insertArticles(articles);
    })
    .then(() => {
        console.log('Articles inserted succesfully');
        return sql.listArticles();
    })
    .then(articles => {
        console.log('Articles inserted succesfully');
        console.table(articles);
        return sql.deleteArticleById(3);
    })
    .then(() => {
        console.log('Article deleted succesfully');
        return sql.updateStockById(0, 2);
    })
    .then(() => {
        console.log('Article updated succesfully');
        return sql.listArticles();
    })
    .then(articles => {
        console.log('Total Result');
        console.table(articles);
    })
    .catch(err => { console.log(err); throw err })
    .finally(() => {
        sql.close();
    });


