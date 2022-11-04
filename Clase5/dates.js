let moment = require('moment');
let Dates = require('./datesController');

let birthday = moment("23/04/03", "DD/MM/YY");

const obj = new Dates(birthday);

console.log(`Today: ${obj.getToday()}`);
console.log(`Years: ${obj.getAllYears()}`);
console.log(`Days: ${obj.getAllDays()}`);