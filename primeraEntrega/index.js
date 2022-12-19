const express = require("express");
const app = express();

const Products = require('./resources/products.js');
const products = new Products('./resources/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.send('PRIMERA ENTREGA FINAL');
});

//Router API productos
app.get('/api/productos/', async (req, res) => {
    let productsArr = await products.getAll();
    productsArr.forEach(item => item.timestamp = Date.now());
    res.json(productsArr);
});
app.get('/api/productos/:id', async (req, res) => {
    let id = req.params.id;
    let product = await products.getById(id);
    product ? res.json({product}) : res.json({ERROR:`Error: ID '${id}' not found.`});
});
app.post('/api/productos/', async (req, res) => {
    let newProduct = req.body;
    if(newProduct){
        newProduct = await products.saveProduct(newProduct);
        res.json({
            new_product: newProduct
        });
    } else{
        res.status(404).send('Products not found.')
    };
});
app.put('/api/productos/:id', async (req, res) => {
    let oldProd = await products.getById(req.params.id);
    let newProd = await products.updateProduct(req.body);
    if(oldProd.id === req.body.id){
        try {
            res.json({
                newProd,
                oldProd: oldProd,
                newProduct: req.body
            });
            console.log('Product updated.');
        } catch (error) {
            console.error('Failed to update.');
            console.error(error);
        };
    } else {
        console.error('Failed to update. ID´s are different.');
        console.error(error);
    };
});
app.delete('/api/productos/:id', async (req, res) => {
    let deleted = await products.getById(req.params.id);
    if(deleted) {
        await products.deleteById(req.params.id);
        res.json({deleted_product: deleted});
    } else {
        console.error('Failed to delete');
        console.error(error);
    }
});

// Router API carrito

//Server ON 
const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`Server on: http://localhost:${PORT}`));