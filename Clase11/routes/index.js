

module.export = app => {
    app.get('/', (req, res, next) => {
        res.render('index', {response: "OK!"});
    });
}