var path = require('path');
var currentDir = __dirname.split('\\').slice(-1).join('');
var product = process.argv[2];
var server = null;
if (product === 'dev') {
    server = require('../../build/webpack.dev.conf.js')(currentDir);
    module.exports = server;

} else {
    server = require('../../build/webpack.prod.conf.js')(currentDir);
    module.exports = server;
}