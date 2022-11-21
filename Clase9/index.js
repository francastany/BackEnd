let express = require("express");
let app = express();
let fs = require("fs");
const PORT = 3001;


app.engine('cte', async(filePath, options, cb) => {
    try {
        const content = await fs.promises.readFile(filePath);
        const rendered = content.toString()
                                .replace(`^^titulo$$`, options.titulo)
                                .replace(`^^msj$$`, options.msj)
                                .replace(`^^autor$$`, options.autor)
                                .replace(`^^version$$`, options.version)
        return cb(null, rendered);
    } catch (error) {
        return cb(new Error(error))
    }
});

app.set("views", "./views/custom");
app.set("view engine", "cte");

app.get("/", (req, res) => {
    res.send("OK!")
});

app.get("/cte1", (req, res) => {
    let data = {
        titulo: "INTERESTELLAR",
        msj: "De mis pelis favs",
        autor: "Cristopher Nolan",
        version: "2014.0.0"
    }
    res.render("plantilla1", data);
});

app.get("/cte2", (req, res) => {
    let data = {
        nombre: "Juan",
        apellido: "Perex",
        fecha: `${new Date().toLocaleDateString()}`,
    }
    res.render("plantilla2", data);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))