//Dependencias
import express from "express";
import Perimetro from "./lib/perimetro";
import Superficie from "./lib/superficie";

//Constantes
const app = express();

//Perimetros
app.get('/perimetro', (req, res) => {
    const { figura, lado1, lado2, lado, radio } = req.query;
    let result:number;

    if(figura === 'cuadrado' && lado) {
        result = Perimetro.cuadrado(Number(lado));
    } else if(figura === 'rectangulo' && lado1 && lado2) {
        result = Perimetro.rectangulo(Number(lado1), Number(lado2));
    } else if (figura === 'circulo' && radio) {
        result = Perimetro.circulo(Number(radio));
    } else {
        return res.send("Parametros Invalidos");
    };

    res.json({
        calculo: "perimetro",
        figura,
        result
    });
});

//Superficie
app.get('/superficie', (req, res) => {
    const { figura, lado1, lado2, lado, radio } = req.query;
    let result:number;

    if(figura === 'cuadrado' && lado) {
        result = Superficie.cuadrado(Number(lado));
    } else if(figura === 'rectangulo' && lado1 && lado2) {
        result = Superficie.rectangulo(Number(lado1), Number(lado2));
    } else if (figura === 'circulo' && radio) {
        result = Superficie.circulo(Number(radio));
    } else {
        return res.send("Parametros Invalidos");
    };

    res.json({
        calculo: "superficie",
        figura,
        result
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor express con TS y WebPack en ${PORT}`);
})