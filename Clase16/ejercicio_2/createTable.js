const { options } = require('./options/mysql.js')
const knex = require("knex")(options)

//Creamos una tabla con la funcion createTable() del esquema Knex.js y definimos el esquiema para que tenga 3 columnas(id, precio, nombre).
knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
})
    .then(() => {console.log('Table created.');})
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy()
    });

