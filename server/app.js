const Url = require("url");

const routes = require("./routes");

const app = (req, res) => {
    const { headers, method, url } = req;
    let parsedURL = Url.parse(req.url, true);
    let path = parsedURL.pathname;
    // parsedURL.pathname  parsedURL.query
    // standardize the requested url by removing any '/' at the start or end
    // '/folder/to/file/' becomes 'folder/to/file'
    path = path.replace(/^\/+|\/+$/g, "");
    console.log(path);
    let qs = parsedURL.query;
    let body = [];

    req.on("data", chunk => {
        body.push(chunk);
        console.log("reading data");
    }).on("end", () => {
        //request part is finished... we can send a response now
        body = Buffer.concat(body).toString();
        body = body ? JSON.parse(body) : {};
        console.log("send a response");

        let pathElements = path.split("/");
        let main = pathElements[0];
        let endpoint = pathElements[1];
        let route = typeof routes[main] !== "undefined" ? routes[main] : routes["notFound"];
        let data = {
            path,
            endpoint,
            queryString: qs,
            headers,
            method,
            body
        };

        const sendResponse = (result) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.write(JSON.stringify(result || {}));
            res.end("\n");
        }

        const sendError = (error) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(500);
            res.write(JSON.stringify(error || { message: "Internal Server Error" }));
            res.end("\n");
        }
        res.send = sendResponse;
        res.sendError = sendError;

        //pass data incase we need info about the request
        //pass the response object because router is outside our scope
        route(data, res);
    });
}

module.exports = app;