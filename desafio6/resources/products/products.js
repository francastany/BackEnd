const { promises: fs } = require('fs')

class Container{
    constructor(route){
        this.route = route
    }
    async save(obj){
        const products = await this.getAll();
        const index = products.map(element => element.id).indexOf(obj.id)
        if(index >= 0){
            //Si existe
            let oldProduct = products[index];
            obj.id = products[index].id;
            products[index] = obj;
            try {
                await fs.writeFile(this.route, JSON.stringify(products, null, 2))
                console.log('Guardado exitoso')
                return [obj, oldProduct]
            } catch (error) {
                console.error('Error de escritura')
                console.error(error)
                return []
            }
        }
        else{
            // Si no existe
            console.log('Not found')
            return []
        }
    }
    async getAll(){
        try {
            let products = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error('Error de lectura.');
            console.error(error);
            return [];
        }
    }
    async saveProduct(obj){
        const products = await this.getAll();
        obj.id = parseInt(obj.id);
        obj.id = this.checkId(obj, products);
        obj.price = parseInt(obj.price);
        try {
            console.log(`New element : \n${JSON.stringify(obj)}`);
            products.push(obj);
            await fs.writeFile(this.route, JSON.stringify(products, null, 2));
            console.log('Guardado exitoso');
            return obj
        } catch (error) {
            console.error('Error de escritura');
            console.error(error);
        }
    }
    checkId(product, arr){
        arr.forEach(element => {
            if(element.id == product.id){
                console.warn('El id del elemento ya existe, se le asignara uno nuevo.')
                return this.newId(product, arr)
            } 
        });
        return product.id
    }
    newId(product, arr){
        arr.sort((a, b) => {return a - b}) // Ordenamos de forma ascendente segun el id
        product.id = parseInt(arr[arr.length - 1].id) + 1 // Tomamos el id mas grande le sumamos 1 y lo asignamos al producto
        console.log(`Nuevo id del producto : ${product.id}`)
        return product.id
    }
}

module.exports = Container;