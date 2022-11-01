let fs = require('fs');
let moment = require('moment');

class FileHandler{
    constructor(url){
        this.url = url;
        this.fecha = moment().format('L');
        this.file = null;
    }
    async read(){
        try{
            return await fs.promises.readFile(this.url, 'utf-8');
        } catch(error){
            throw new Error (error);
        }
    }
    async write(url, content){
        try{
            return await fs.promises.writeFile(url, content);
        } catch(error){
            throw new Error (error);
        }
    }
    async delete(){
        try{

        } catch(error){
            throw new Error (error);
        }
    }

    async init(){
        try{
            let file = await this.read();
            let file_obj = JSON.parse(file);
            console.log(file_obj)
            file_obj.author = 'Luka Doncic';

            await this.write('./package.json.coder', JSON.stringify(file_obj, null, 2));
        
        } catch (error){
            throw new Error(error);
        }
    }
}

let obj1 = new FileHandler('./package.json');
obj1.init();

// console.log(obj1.file);