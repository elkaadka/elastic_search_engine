var config = require('./config');
var logs = require('./logs');

//loading express
logs.log("Loading express....");
try {
    var express = require('express');
    var app = express();
    logs.success('OK\n');
} catch (exception) {
    logs.error('NOK\n');
    process.exit(1);
}

//loading http server
logs.log("Loading "+ config.PROTOCOL +"server....");
try {
    var server = require(config.PROTOCOL).createServer(app);
    logs.success('OK\n');
} catch (exception) {
    logs.error('NOK\n');
    process.exit(1);
}


//Using ejs as a templating engine
logs.log('Loading ejs templating engine....');
try {
    var engine = require('ejs-locals');
    var path = require("path");
    app.set('views', path.join(__dirname, 'views'));
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    logs.success('OK\n');
} catch (exception) {
    logs.error('NOK : ' + exception.message +  '\n');
    process.exit(1);
}

//Loading routes
logs.log('Loading routes....');
try {
    var routes = require('./routes')(app);
    logs.success('OK\n');
} catch (exception) {
    logs.error('NOK\n');
    process.exit(1);
}

//serving static files in the public folder (css, js, images)
logs.log('Serving static files....');
try {
    var statics = require('./public');
    statics.serve(app, express);
    logs.success('OK\n');
} catch (exception) {
    logs.error('NOK\n');
    process.exit(1);
}

logs.info('Listening on port '+ config.PORT +'...'+"\n");
server.listen(config.PORT).on('error', function(err) {
    logs.error('NOK\n');
    logs.error(err + '\n');
});
