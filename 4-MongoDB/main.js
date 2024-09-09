const app = require("./app");
const mongoose = require("mongoose");
const colors=require("colors");

// Connection
mongoose.connect(process.env.local_connection, {})
    .then(() => {

        // Server initialization
        app.listen(process.env.PORT, () => console.log(colors.blue(`Server is Listening on http://localhost:${process.env.PORT}`)));

        console.log(colors.green(`Connected To MongoDB Database Successfully`))
    })
    .catch(error => {

        console.log(colors.red(`Error while Connecting to Database`, error))
    });