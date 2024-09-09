const fs = require("fs");
const path = require("path");

// Define the path to the product database file
const pathToDatabase = path.join(__dirname, "../database/product.json");

module.exports = class Product {
    // Constructor function to initialize product properties
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Method to save a new product to the database
    async save() {

        return new Promise((resolve, reject) => {
            // Read the product database file
            fs.readFile(pathToDatabase, 'utf-8', (error, data) => {

                if (error) {

                    reject(error.message);
                    return;

                } else {

                    // Parse the JSON data  from the database file (Now in Array of  objects form)
                    const productData = JSON.parse(data);
                   

                    // Add the new product (object) to the product data array
                    productData.push({ _id: productData.length + 1, name: this.name, price: this.price });

                    // Write the updated product data back to the database file
                    fs.writeFile(pathToDatabase, JSON.stringify(productData), (error) => {
                        if (error) {
                            return reject(error.message)
                        } else {
                            resolve("Product Appened Successfully")
                        }
                    });
                }
            });

        })
    }

    static findAll() {

        const data = fs.readFileSync(pathToDatabase, 'utf-8');

        return JSON.parse(data);
    }

    static async deleteOne(_id){

        return new Promise((resolve, reject) => {
            
            fs.readFile(pathToDatabase,'utf-8',(error,data)=>{

                if(error){
                    reject(error.message)
                    return
                }

                const productDbData=JSON.parse(data);
                const newProductDbData=productDbData.filter(product=>{
                    return product._id!==_id
                })

                fs.writeFile(pathToDatabase,JSON.stringify(newProductDbData),(error)=>{

                    if(error){
                        reject(error.message)
                        return
                    }
                        resolve(newProductDbData)
                    
                })
            })
        })
    }
}
