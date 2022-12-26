//Importamos dependencias
import ClientSQL from "./sql.js";
import { options } from './options/SQLite3.js';

//Conexiones
const sql = new ClientSQL(options);

//Funciones
try {
    await sql.createTable()
    console.log('Table created.');

    const articlesToInsert = [
        { nombre: "Remera", codigo: 'AB-12', precio: 15000, stock: 50 },
        { nombre: "Zapatillas", codigo: 'AB-13', precio: 25000, stock: 55 },
        { nombre: "Botines", codigo: 'AB-14', precio: 35000, stock: 56 },
        { nombre: "Campera", codigo: 'AB-15', precio: 45000, stock: 57 },
        { nombre: "Piluso", codigo: 'AB-16', precio: 5000, stock: 58 },
    ];
    await sql.insertArticles(articlesToInsert);
    console.log('Articles inserted.');

    await sql.deleteArticleById(3);
    console.log('Article deleted.');

    const listed = await sql.listArticles();
    console.log('Articles listed.');
    console.table(listed);

    await sql.updateStockById(0, 2);
    console.log('Stock updated.');

    const finalResult = await sql.listArticles();
    console.log('Final Result:');
    console.table(finalResult);
} catch (error) {
    console.log(error);
} finally {
    sql.close();
};