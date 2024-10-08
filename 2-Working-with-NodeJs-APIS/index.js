const http = require("http");

const server = http.createServer(); // This creates an HTTP server instance that we can use to handle incoming requests.

const products = [{ name: "Apple" }, { name: "banana" }, { name: "Date" }]; // Array of Objects

// Function to parse request body
function parse(req) {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString(); //Data will be now in "doubleQuotes"
        });

        req.on('end', () => {
            try {
                console.log(body); //productName=Banana
                
                resolve({ name: body.replace("productName=", "") }); //we receive the data as object and push in array which is also array of objects
    
            } catch (error) {
                reject(error);
            }
        });

    });
}

// Middleware for logging request details
server.prependListener('request', (req, res) => {

    console.log(req.method, req.url);
    req.message = "Message From Middleware";
    req.error = "Error From Middleware";

});

// Event listener for handling requests
server.on('request', (req, res) => {
    // Logging request details
    console.log(req.message, "\n", req.error);

    if (req.url === "/") {

        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <h1>Home Page</h1>
            <form action="/products" method="POST">
                <input type="text" name="productName"/>
                <button type="submit">POST Request</button>
            </form>
        `);

    } else if (req.url === '/products') {

        if (req.method === "POST") {

            parse(req)
                .then(product => {

                    products.push(product);
                    res.end(`Product Added! \n ${JSON.stringify(products)}`); //res.end():sed to end the response process and send data back to the client. It accepts only string or buffer data as its argument

                })
                .catch(error => {
                    res.statusCode = 400;
                    res.end("Invalid Data Error", error);
                });

        } else if (req.method === 'GET') {

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(products));

        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 405;
            res.end("Method not Allowed");
        }

    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end("Page Not Found");
    }

});

// Server initialization
server.listen(3000, () => console.log(`Server is Listening on http://localhost:3000`));

