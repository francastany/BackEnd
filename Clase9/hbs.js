let express = require("express");
let app = express();
let hbs = require("express-handlebars");
const PORT = 8080;


app.engine('hbs', hbs.engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + './views/layouts',
}));

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    let data = {
        titulo: "INTERESTELLAR",
        msj: "De mis pelis favs",
        autor: "Cristopher Nolan",
        version: "2014.0.0"
    }
    res.render("index", data);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))