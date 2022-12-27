import knexLib from "knex";
import { promises as fs } from 'fs';

function checkLength(arr){
    if (arr.length === 0){
        console.error('El array esta vacio')
        return false
    }
    return true
}
function newId(product, arr){
    arr.sort((a, b) => {return a - b}) // Ordenamos de forma ascendente segun el id
    product.id = parseInt(arr[arr.length - 1].id) + 1 // Tomamos el id mas grande le sumamos 1 y lo asignamos al producto
    console.log(`Nuevo id del producto : ${product.id}`)
    return product.id
}
function checkId(product, arr){
    arr.forEach(element => {
        if(element.id == product.id){
            console.warn('El id del elemento ya existe, se le asignara uno nuevo.')
            return this.newId(product, arr)
        } 
    });
        return product.id
}

class ClientSQL {
    constructor(config, table, route) {
        this.knex = knexLib(config),
        this.table = table,
        this.route = route
    }


    async getAll() {
        try {
            const products = await this.knex(this.table).select('*');
            this.close();
            console.log(products);
            return products
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id) {
        try {
            const product = await this.knex(this.table).select('*').where('id', id);
            this.close();
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    async saveProduct(obj) {
        const products = await this.getAll();
/*         obj.id = parseInt(obj.id);
        obj.id = checkId(obj, products);
        obj.price = parseInt(obj.price); */
        try {
            await this.knex(this.table).insert(obj)
                .then(() => { console.log(`${JSON.stringify(obj)} added.`);})
                .catch(error => {console.log(error); throw error})
                .finally( async () => {
                    products.push(obj);
                    await fs.writeFile(this.route, JSON.stringify(products, null, 2));
                    this.close();
                })
        } catch (error) {
            console.log(error);
        }
    };

    async saveMessage(message) {
        const messages = await this.getAll();
        try {
            await this.knex(this.table).insert(message)
                .then(() => console.log(`${JSON.stringify(obj)} added.`))
                .catch(error => {console.log(error); throw error})
                .finally(async () => {
                    messages.push(message);
                    await fs.writeFile(this.route, JSON.stringify(messages, null, 2));
                    this.close();
                })
        } catch (error) {
            console.log(error);
        }
    };

    async close(){
        try {
            await this.knex.destroy();
        } catch (error) {
            console.log(error);
        }
    };
};

export default ClientSQL;