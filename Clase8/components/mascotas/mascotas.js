let { Router } = require("express");
let router = new Router();
module.exports = app => {
    let _arr = [
        {
            nombre: "Mila",
            raza: "gato",
            edad: 9
        },
        {
            nombre: "Lulo",
            raza: "gato",
            edad: 2
        },
    ];

    app.use("/mascotas", router);
    router.get("/", (req, res, next) => {
        res.json({mascotas:_arr});
    })

    router.post("/", (req, res, next) => {
        let obj = req.body;
        _arr.push(obj);
        res.json({mascotas: _arr})
    })
}