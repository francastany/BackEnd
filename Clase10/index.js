const express = require("express");
const app = express();
const PORT = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded( { extended:true } ));

//View Engine

app.set("views", "./views/ejs");
app.set("view engine", "ejs");

let students = [];

app.get('/datos', (req, res, next) => {
    res.render('index-pug', req.query);
    console.log(req.query)
});

app.get('/', (req, res, next) => {
    res.render('index', {students});
});

app.post('/create', (req, res, next) => {
    students.push(req.body);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
