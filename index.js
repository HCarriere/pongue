const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser= require('body-parser');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3006;
const server = http.createServer(app);
const forceSsl = process.env.ENV == 'production';

let handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
});

app
.use(appForceSsl)

// express
.use(express.static(path.join(__dirname,'views/assets')))

// to support JSON-encoded bodies
.use(bodyParser.json()) 

// to support URL-encoded bodies
.use(bodyParser.urlencoded({
    extended: true
}))

// handlebars
.engine('.hbs', handlebars.engine)
.set('view engine', '.hbs')
.set('views', path.join(__dirname, 'views/layouts'));


const game = require('./app/game');
game.init(server);

app
.get('/', (req, res) => {
    res.render('game', {
        additionalJS : [
            '/js/dist/game.js',
            '/socket.io/socket.io.js'
        ]
    });
})


// 404
.get('*', (req, res) => {
    res.status(404);
    res.json({
        error: 404
    });
})

// error handler
.use((err, req, res, next) => {  
    console.log('server error : '+err);
    res.status(500);
    res.json({error:err});
});

server.listen(port, (err) => {
    if(err) {
        console.log('server launch error : '+err);
    } else {
        console.log(`platform listening on port ${port}`);
    }
});


function appForceSsl(req, res, next) {
    if(forceSsl) {      
        if(req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
    }
    return next();
}