const { promises: fs } = require('fs');

class Container{
    constructor (route) {
        this.route = route;
    };
    async getCart(){
        try {
            const cart = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(cart);
        } catch (error) {
            console.log('Failed to get.');
            console.error(error);
        }
    }
    async addProduct(obj){
        const cart = await this.getCart();

        try {
            cart.products.push(obj);
            console.log(`Product added: ${JSON.stringify(obj)}`);
            await fs.writeFile(this.route, JSON.stringify(cart, null, 2));

            return cart;
        } catch (error) {
            console.log('Failed to add.');
            console.error(error);
        }
    }
    async emptyCart(cart){
        let cart = await this.getCart();
        try {
            cart = [];
            await fs.writeFile(this.route, JSON.stringify(cart, null, 2));
            console.log('The cart is empty.');
        } catch (error) {
            console.log('Failed to empty.');
            console.error(error);
        }
    }
}