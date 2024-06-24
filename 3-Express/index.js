require("dotenv").config();
const express = require("express");
const userRoutes=require("./routes/user.routes");
const productRoutes=require("./routes/product.routes");


// instance of express framework
const app = express();

// Middlewares
app.use(express.json()); //To parse json data
app.use(express.urlencoded({extended:false})) //To parse url-encoded data
app.use((req, res, next) => {

    console.log(`Incomming ${req.method} Request On Url :  ${req.url}`);
    next();
})

// Routes
app.get('/', (req, res) => res.send("Hello World")) //Test Route

// Main Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes)


// Server initialization
app.listen(process.env.PORT, () => console.log(`Server is Listening on http://localhost:${process.env.PORT}`));