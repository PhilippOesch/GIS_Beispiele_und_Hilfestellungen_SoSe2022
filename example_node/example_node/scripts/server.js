/* eslint-disable max-len */
const http = require("http");

const hostname = "127.0.0.1"; // localhost
const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    const url = new URL(request.url || "", `http://${request.headers.host}`);

    switch (url.pathname) {
    case "/":
        console.log("Basic Path");

        break;

    case "/banana":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", () => {
                console.log("---------------------------------------------------------------------");
                console.log(JSON.parse(jsonString).amount + "x bananas were added to the basket");
                console.log("---------------------------------------------------------------------");
                response.end("Banana was added to the basket");
            });
        }
        break;

    case "/apple":

        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", () => {
                // Hier passiert etwas mit den Daten
                console.log("---------------------------------------------------------------------");
                console.log(JSON.parse(jsonString).amount + "x apples were added to the basket");
                console.log("---------------------------------------------------------------------");
                response.end("Apple was added to the basket");
            });
        }
        break;

    default:
        response.statusCode = 404;
    };
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});