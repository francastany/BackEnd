//Dependencias
import knexLib from "knex";

//Creamos instancias mysql
class ClientSQL {
    constructor(config){
        this.knex = knexLib(config);
    }

    createTable(){
        return this.knex.schema.dropTableIfExists('articulos')
            .finally(() => {
                return this.knex.schema.createTable('articulos', table => {
                    table.increments('id').primary();//auto incremental
                    table.string('nombre', 50).notNullable();
                    table.string('codigo', 10).notNullable();
                    table.float('precio');
                    table.integer('stock');
                })
            })
    }
    insertArticles(article){
        return this.knex('articulos').insert(article);
    }

    listArticles(){
        return this.knex('articulos').select('*'); //IGUAL QUE 'SELECT * FROM articulos' en SQL
    }

    deleteArticleById(id){
        return this.knex.from('articulos').where('id', id).del();
    }

    updateStockById(stock, id){
        return this.knex.from('articulos').where('id', id).update({stock: stock});
    }

    close(){
        this.knex.destroy();
    }
}

export default ClientSQL;