const http = require('http');
const fs= require('fs');   // files system
const _= require('lodash');

const server = http.createServer((req, res) => {

    
    if(req.url === '/'){
        fs.readFile('./views/index.html', (err, data) => {
            res.statusCode = 200;
            if(err){
                console.log(err);
                res.end();
            }else{
                res.end(data);
            }
        });
    }else if(req.url === '/about'){
        res.statusCode = 200;
        fs.readFile('./views/about.html', (err, data) => {
            if(err){
                console.log(err);
                res.end();
            }else{
                res.end(data);
            }
        });
    }else{
        res.statusCode = 404;
        fs.readFile('./views/404.html', (err, data) => {
            if(err){
                console.log(err);
                res.end();
            }else{
                res.end(data);
            }
        });
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on portal 3000.')
});
