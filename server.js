var express = require('express');
var server = express();

require('./settings')(server);

console.log('Server listening on port ' + server.settings.port);
server.listen(server.settings.port);
