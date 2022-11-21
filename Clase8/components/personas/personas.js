let { Router } = require("express");
let router = new Router();
let multer = require("multer");
let path = require("path");

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${file.originalname}`)
    }
});

let midMulter = multer({
    storage,
    dest: path.join(__dirname, '../../uploads'),
    limits: {fileSize: 1000000}
})

let addInfo = (req, res, next) => {
    req.body.nacionalidad = "Turquía";
    next();
}

module.exports = app => {
    let _arr = [
        {
            nombre: "Agustín K.",
            edad: 999
        },
        {
            nombre: "Axel F.",
            edad: 25
        },  
    ];

    app.use(router.midMulter())

    app.use("/personas", router);
    router.get("/", (req, res, next) => {
        res.json({personas:_arr});
    })

    router.post("/", addInfo, (req, res, next) => {
        let obj = req.body;
        _arr.push(obj);
        res.json({mascotas: _arr})
    });

    router.post("/archivo", midMulter, (req, res, next) => {
        console.log("------------------------------");
        console.log(req.file);

        res.json({hola: "holi"})
    })
}