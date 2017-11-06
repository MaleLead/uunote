'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function(root) {
    let assetsRoot = path.resolve(__dirname, '../dist/' + root[0]);
    let publickPath = 'assets';
    let entries = require('./get-entries')(root);
    const htmls = require('./get-entries')(root, 'html')
    console.log(entries);
    console.log(htmls);
    const webpackConfig = {
        entry: entries,
        output: {
            // 打包文件和调试服务器的根目录 
            path: assetsRoot, //导出目录的绝对路径
            // 输出路径以及名字
            filename: '[name]/[name].js', //导出文件的文件名
            // 热重载路径
            publicPath: '/', //生产模式或开发模式下html、js等文件内部引用的公共路径
            chunkFilename: '[name]/[id].[chunkhash].js'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'], //自动解析确定的拓展名,使导入模块时不带拓展名
            alias: { // 创建import或require的别名
                'vue$': 'vue/dist/vue.esm.js',
                // '@': resolve('src'),
                '@assets': resolve('src/' + root[0] + '/assets'),
                '@components': resolve('src/' + root[0] + '/components')
            },
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [resolve('src'), resolve('test')] //必须处理包含src和test文件夹
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024, // 门限 小于1k的资源会被转成base64格式数据
                        name: '[name].[ext]', // 输出文件的名字
                        outputPath: publickPath + '/images/', // 输出路径 将静态资源打包到静态资源文件夹
                        publicPath: '/' // 处理静态资源路径问题，重新定义路径为根目录
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[hash:7].[ext]',
                        outputPath: publickPath + '/audio/',
                        publicPath: '/'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|ionicons)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[hash:7].[ext]',
                        outputPath: publickPath + '/fonts/',
                        publicPath: '/'
                    }
                }
            ]
        },
        plugins: []
    }
    for (let name in htmls) {
        if (!htmls.hasOwnProperty(name)) continue;
        // 添加 多入口js文件的html模板文件
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: name + '/' + name + '.html', //生成的html的文件名
            template: htmls[name], //依据的模板
            inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
            minify: { //压缩配置
                removeComments: true, //删除html中的注释代码
                collapseWhitespace: true, //删除html中的空白符
                removeAttributeQuotes: true //删除html元素中属性的引号
            },
            // 模板文件引入的名字
            chunks: [name, 'common'],
            chunksSortMode: 'dependency' //按dependency的顺序引入
        }))

    }

    function resolve(dir) {
        return path.join(__dirname, '..', dir)
    }

    return webpackConfig;

}