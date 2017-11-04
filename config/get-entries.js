const glob = require('glob')
const path = require('path')
    //  获取入口文件js或者 模板html文件
module.exports = function(root, name) {
    let entries = {},
        basename;
    name = name || 'js';
    let path1 = path.join(__dirname, '..', 'src/' + root + '/views/*/*.' + name);
    glob.sync(path1).forEach(entry => {
        basename = path.basename(entry, path.extname(entry));
        entries[basename] = entry;
    })
    return entries;
}