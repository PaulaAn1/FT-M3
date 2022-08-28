var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
  fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, img) => {
    if (err) {
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end('Img not found');
    } else {
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(img)
    }
  })

}).listen(1337, '127.0.0.1')