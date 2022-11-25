const express = require("express");
const app = express();
const PORT = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded( { extended:true } ));

//View Engine

app.set("views", "./views/pug");
app.set("view engine", "pug");

app.get('/datos', (req, res, next) => {
    res.render('medidor', req.query);
});

app.listen(PORT);
