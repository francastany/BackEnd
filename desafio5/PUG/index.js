//Express
const express = require("express");
const app = express();
const PORT = 3001;

//App settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine', 'pug');

let arrProductos = [];

app.get('/', (req, res, next) => {
    res.render('formPage', {arrProductos})
});
app.post('/productos', (req, res, next) => {
    arrProductos.push(req.body);
    res.redirect('/');
});
app.get('/productos', (req, res, next) => {
    res.render('productos', {arrProductos})
});

//App Listen
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
