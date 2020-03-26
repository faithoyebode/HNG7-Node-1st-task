const http = require("http");
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

http.createServer((req, res) => {
    if(req.url==="/"){
        fs.readFile('index.html', "UTF-8", (err, data) => {
            if (err){
                res.writeHead(404);
                res.end("Page not found");
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        }); 
    }
    else if (req.url==="/style.css"){
        fs.readFile(path.join(__dirname, '/style.css'), (err, data) => {
            if (err){
                res.writeHead(404);
                res.end("CSS file not found");
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.end(data);
        });
    }
    else if (req.url == '/message' && req.method == 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let postBody = parse(body);
            fs.appendFile('message.txt', "\n"+postBody.message, () => {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(postBody.message);
                res.end();
            });
        });    
    }
})
.listen(8080);
