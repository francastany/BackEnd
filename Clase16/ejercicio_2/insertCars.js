//Importamos dependencias
const {options} = require('./options/mysql.js');
const knex = require('knex')(options);

//Funcionalidades

//Array de datos
const cars = [
    {name: 'Audi', price: '1000'},
    {name: 'Fiat', price: '400'},
    {name: 'Renault', price: '700'},
    {name: 'Hummer', price: '1000'},
    {name: 'Toyota', price: '750'}
];

knex('cars').insert(cars)
    .then(() => {console.log('Data inserted.')})
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy()
    });