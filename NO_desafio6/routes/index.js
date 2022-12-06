module.exports = (app) => {
    let arrProductos = [];

    app.get('/', (req, res, next) => {
        res.render('index', {arrProductos})
    });
    app.post('/productos', (req, res, next) => {
        // arrProductos.push(req.body);
        res.redirect('/');
    });
    app.get('/productos', (req, res, next) => {
        res.render('productos', {arrProductos})
    });
}