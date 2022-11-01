let fs = require('fs');

try{
    let fyh_now = `${new Date().toLocaleDateString()}`;
    // let file = fs.writeFileSync('./Clase4/fyh.txt', fyh_now);  ---> ESCRIBIR/CREAR ARCHIVO
    let file = fs.readFileSync('./Clase4/fyh.txt', 'utf-8');
    console.log(file); // ------> LEER ARCHIVO
} catch(error) {
    console.log(error)
}