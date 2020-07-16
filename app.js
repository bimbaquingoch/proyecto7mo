const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'aplication/json' })
    let content = {
        nombre: Bryan,
        edad: 22,
        url: req.url
    }
    res.write(JSON.stringify(content))
    res.end()

}).listen(8000)

console.log('ecuchando el puerto 8000');