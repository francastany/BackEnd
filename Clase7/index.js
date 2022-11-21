const express = require("express");
const app = express();
const PORT = 3001;

const frase = "El que depositó dolares, recibirá dolares."

app.get("/", (req, res, next)=> {
    res.send("Hello everyone");
});

app.get("/frase", (req, res, next)=> {
    res.json({frase});
});
app.get("/letras/:num", (req, res, next)=> {
    let {num} = req.params;
    if(!isNaN(num)){
        let arrFrase = frase.split("");
        let response = Number(num) > arrFrase.length ? "Numero excede el límite" : arrFrase[Number(num) - 1]
        res.send(`${response}`);
    } else{
        res.send("Send a number please.")
    }
});

app.get("/palabras/:num", (req, res, next)=> {
    let {num} = req.params;
    if(!isNaN(num)){
        let arrWords = frase.split(" ");
        let response = Number(num) > arrWords.length ? "Numero excede el límite" : arrWords[Number(num) - 1]
        res.send(`${response}`);
    } else{
        res.send("Send a number please.")
    }
});
/* 
app.get("/users/:id/:resource", (req, res, next)=> {
    let {id, resource} = req.params;
    let {name, lastname} = req.query;
    res.json({id, name, resource, lastname});
}); */

app.listen(PORT, () => {console.log(`Server on http://localhost:${PORT}`)});

