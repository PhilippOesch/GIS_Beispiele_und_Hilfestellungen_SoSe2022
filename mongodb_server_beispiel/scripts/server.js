/* eslint-disable max-len */
const http = require("http");
const mongodb = require("mongodb");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
const url = "mongodb://localhost:27017"; // für lokale MongoDB //27017
const mongoClient = new mongodb.MongoClient(url);

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

const server = http.createServer( async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    const url = new URL(request.url || "", `http://${request.headers.host}`);

    switch (url.pathname) {
        case "/":
            console.log("Basic Path");

            break;

        case "/banana":
            const bananaCollection = mongoClient.db("fruits").collection("banana");
            if (request.method === "POST") {
                let jsonString = "";
                request.on("data", (data) => {
                    jsonString += data;
                });
                request.on("end", () => {
                    bananaCollection.insertOne(JSON.parse(jsonString));
                    console.log("---------------------------------------------------------------------");
                    console.log("Object: " + jsonString + "x bananas were added to the basket");
                    console.log("---------------------------------------------------------------------");
                    response.end("Banana was added to the basket");
                });
            }
            if (request.method === "GET") {
                const result = await bananaCollection.find({}).toArray();
                response.end(JSON.stringify(result));
            }
            break;

        case "/apple":
            const appleCollection = mongoClient.db("fruits").collection("apple");
            if (request.method === "POST") {
                let jsonString = "";
                request.on("data", (data) => {
                    jsonString += data;
                });
                request.on("end", () => {
                    // Hier passiert etwas mit den Daten
                    console.log("---------------------------------------------------------------------");
                    console.log("Object: " + jsonString + " was added to the basket");
                    console.log("---------------------------------------------------------------------");
                    console.log(jsonString);
                    appleCollection.insertOne(JSON.parse(jsonString));
                    response.end("Apple was added to the basket");
                });
            }
            if (request.method === "GET") {
                const result = await appleCollection.find({}).toArray();
                response.end(JSON.stringify(result));
            }
            break;

        default:
            response.statusCode = 404;
    };
});

startServer();