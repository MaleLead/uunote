var path = require('path');
var currentDir = __dirname.split('\\').slice(-1).join(''); // 获取当前文件夹的名字
var product = process.argv[2]; // 获取当前执行模式  调试或者打包
var server = null;
const runningDir = [currentDir] // 调试的模块   如果只传当前文件夹的名字默认执行整个文件夹下的所有模块
    // const runningDir = [currentDir, 'index', 'detail'] // 调试的模块 如果后面传其他模块，只执行调试传入的模块。
if (product === 'dev') {
    server = require('../../config/server.js')(runningDir);
    module.exports = server;

} else {
    server = require('../../config/build.js')([currentDir]);
    module.exports = server;
}