const config = require('./config');
const log = require('./logs');

//loading express
const express = require('express');
const app = express();

//loading http server
const server = require(config.PROTOCOL).createServer(app);


//Using ejs as a templating engine
const engine = require('ejs-locals');
const path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Loading routes
require('./routes')(app);

//serving static files in the public folder (css, js, images)
const statics = require('./public');
statics.serve(app, express);

//Listen on port specified in the config file
server.listen(config.PORT).on('error', function(err) {
    log.error(err);
});

//open the webpage on startup
const opn = require('opn');
opn(config.PROTOCOL + '://localhost:'+config.PORT);