//Importamos dependencias
const {options} = require('./options/mysql.js');
const knex = require('knex')(options);

//Funcionalidades
knex.from("cars").select("*")
    .then((rows) => {
        for (const row of rows) {
            console.log(`${row[ "id" ]} ${row[ "name" ]} ${row[ "price" ]}`)
        }
    }).catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    })