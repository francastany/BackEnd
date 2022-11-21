let mascotasApi = require("../components/mascotas/mascotas");
let personasApi = require("../components/personas/personas");

module.exports = app => {
    mascotasApi(app);
    personasApi(app);
    app.get("/", (req, res, next) => {
        res.send("HOLA");
    })
}
/* 
    app.use("/mascotas", router_mascotas);
    router_mascotas.get("/", (req, res, next) => {
        res.send("Hola. Estoy en Mascotas")
    })

    app.use("/personas", router_personas);
    router_personas.get("/", (req, res, next) => {
        res.send("Hola. Estoy en Personas")
    }) 
*/