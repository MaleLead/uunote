var path = require('path');
var currentDir = __dirname.split('\\').slice(-1).join('');
var product = process.argv[2];
var server = null;
if (product === 'dev') {
    server = require('../../config/server.js')(currentDir);
    module.exports = server;

} else {
    server = require('../../config/build.js')(currentDir);
    module.exports = server;
}