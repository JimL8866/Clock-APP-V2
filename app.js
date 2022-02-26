import http from "http";
import fs from "fs";
import path from "path";
import url from "url";
import mimeTypes from "mime-types";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lookup = mimeTypes.lookup;

const server = http.createServer();

server.on ("request", (req, res) => {
    let parsedUrl = url.parse(req.url, true).path.replace(/^\/+|\/+$/g, "");
    console.log(parsedUrl)

    if (parsedUrl==="") {
        parsedUrl = "index.html"
    }
    console.log(`Requested path ${parsedUrl}`);
    console.log(__dirname)
    let file = path.join(__dirname, "/public/", parsedUrl)
    fs.readFile(file, "utf-8", (err, dataStr) => {
        if (err) {
            console.log(`File Not Fund ${file}`)
            res.writeHead(404);
            res.end()
        } else{
            console.log(`Returning ${parsedUrl}`)
            res.setHeader("X-Content-Type-Options", "nosmiff")
            let mime = lookup(parsedUrl)
            res.writeHead(200, {"content-type":mime});
            res.end(dataStr);
        }     
    }) 
})



server.listen(80, ()=> console.log("Server is currently running on http://127.0.0.1"))