class Contador {
    static cuentaGral = 0;
    constructor ( nombre ) {
        this.nombre = nombre;
        this.contador = 0;
    }

    obtenerResponsable() {
        return `El responsable es ${this.nombre}`
    }
    obtenerCuentaIndividual(){
        return `La cuenta de ${this.nombre} es ${this.contador}`
    }
    contar(){
        this.contador++
        Contador.cuentaGral++
    }
    obtenerCuentaGeneral(){
        return `La cuenta global es ${Contador.cuentaGral}`
    }
}

let martin = new Contador('Martin');
let lucas = new Contador('Lucas');

martin.contar()
martin.contar()
martin.contar()
martin.contar()
martin.contar()

console.log(martin.obtenerCuentaIndividual());
console.log(lucas.obtenerResponsable());

lucas.contar();
lucas.contar();

console.log(lucas.obtenerCuentaGeneral());
console.log(lucas.obtenerCuentaIndividual());