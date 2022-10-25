class Usuario {
    constructor(nombre = "", apellido = "", libros = [], mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `Nombre completo del usuario: ${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return `${this.nombre} tiene un total de ${this.mascotas.length} mascota(s)`
    }
    addBook(book, author){
        this.libros.push({ nombre: book, autor: author })
    }
    getBookNames(){
        return this.libros.map(item => item.nombre)
    }
}

//Creación de usuarios
const usuario1 = new Usuario("Sergio", "Massa");
const usuario2 = new Usuario("Pedro", "Picapiedra");

//Usuario 1 -->
console.log(usuario1.getFullName());

usuario1.addMascota('perro');
console.log(usuario1.countMascotas());

usuario1.addBook('Caja Negra', 'Julio Leiva');
usuario1.addBook('Rayuela', 'Cortazar');
console.log(usuario1.getBookNames());

//Usuario 2 -->
console.log(usuario2.getFullName());

usuario2.addMascota('gato');
usuario2.addMascota('Pájaro');
console.log(usuario2.countMascotas());

usuario2.addBook('Eloquent Javascript', 'Marijn Haverbeke');
console.log(usuario2.getBookNames());
