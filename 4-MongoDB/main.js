const app = require("./app");
const mongoose = require("mongoose");

// Connection
mongoose.connect(process.env.local_connection, {})
    .then(() => {

        // Server initialization
        app.listen(process.env.PORT, () => console.log(`Server is Listening on http://localhost:${process.env.PORT}`));

        console.log(`Connected To MongoDB Database Successfully`)
    })
    .catch(error => {

        console.log(`Error while Connecting to Database`, error)
    });