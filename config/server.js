'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const net = require('net')
const os = require('os')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse('"development"')
}
const opn = require('opn') //强制打开浏览器
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware') //使用代理的中间件
module.exports = function(root) {
    if (!root[1]) {
        root[1] = '*';
    }
    const baseWebpackConfig = require('./base')(root)

    Object.keys(baseWebpackConfig.entry).forEach(function(name) {
        baseWebpackConfig.entry[name] = [path.join(__dirname, 'dev-client')].concat(baseWebpackConfig.entry[name])
    })
    const webpackConfig = merge(baseWebpackConfig, {
        module: {
            //通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    "options": {
                        "loaders": {
                            "postcss": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "css": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "less": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                },
                                {
                                    "loader": "less-loader",
                                    "options": {
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "scss": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                },
                                {
                                    "loader": "sass-loader",
                                    "options": {
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "sass": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "mindentedSyntax": true,
                                        "sourceMap": false
                                    }
                                },
                                {
                                    "loader": "sass-loader",
                                    "options": {
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "stylus": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                },
                                {
                                    "loader": "stylus-loader",
                                    "options": {
                                        "sourceMap": false
                                    }
                                }
                            ],
                            "styl": [
                                "vue-style-loader",
                                {
                                    "loader": "css-loader",
                                    "options": {
                                        "minimize": false,
                                        "sourceMap": false
                                    }
                                },
                                {
                                    "loader": "stylus-loader",
                                    "options": {
                                        "sourceMap": false
                                    }
                                }
                            ]
                        },
                        "transformToRequire": {
                            "video": "src",
                            "source": "src",
                            "img": "src",
                            "image": "xlink:href"
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        }
                    ]
                },
                {
                    test: /\.postcss$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        }
                    ],

                },
                {
                    test: /\.less$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        },
                        { loader: 'less-loader', options: { sourceMap: false } }
                    ],
                },
                {
                    test: /\.sass$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        },
                        {
                            loader: 'sass-loader',
                            options: { indentedSyntax: true, sourceMap: false }
                        }
                    ],
                },
                {
                    test: /\.scss$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        },
                        { loader: 'sass-loader', options: { sourceMap: false } }
                    ],
                },
                {
                    test: /\.stylus$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        },
                        { loader: 'stylus-loader', options: { sourceMap: false } }
                    ],

                },
                {
                    test: /\.styl$/,
                    use: ['vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: { minimize: false, sourceMap: false }
                        },
                        { loader: 'stylus-loader', options: { sourceMap: false } }
                    ],
                }
            ]
        },
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            //  声明全局变量
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            }),
            // 热更新模块
            new webpack.HotModuleReplacementPlugin(),
            // webpack 进程遇到错误代码将不会退出
            new webpack.NoEmitOnErrorsPlugin(),
            // }),
            // 识别某些类别的webpack错误并进行清理，聚合和优先排序，以提供更好的开发者体验。
            new FriendlyErrorsPlugin(),
        ]
    })



    let port = 8080 //端口号
    const autoOpenBrowser = true //是否自动打开浏览器
    const proxyTable = {} //http的代理url
    const app = express() //启动express
    const compiler = webpack(webpackConfig) //webpack编
        //1.将编译后的生成的静态文件放在内存中,所以在npm run dev后磁盘上不会生成文件
        //2.当文件改变时,会自动编译。
        //3.当在编译过程中请求某个资源时，webpack-dev-server不会让这个请求失败，而是会一直阻塞它，直到webpack编译完毕
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true,
            stats: {
                colors: true
            },
            // options for formating the statistics
            reporter: null,
            serverSideRender: false,
            // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
        })
        //webpack-hot-middleware的作用就是实现浏览器的无刷新更新
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
            log: false,
            heartbeat: 2000
        })
        //声明hotMiddleware无刷新更新的时机:html-webpack-plugin 的template更改之后
        // compiler.plugin('compilation', function(compilation) {
        //     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        //         hotMiddleware.publish({ action: 'reload' }) // 关闭可实现vue文件热重载.
        //         cb()
        //     })
        // })

    // 应用hotMiddleware中间件
    app.use(hotMiddleware)

    //将代理请求的配置应用到express服务上
    Object.keys(proxyTable).forEach(function(context) {
        let options = proxyTable[context]
        if (typeof options === 'string') {
            options = { target: options }
        }
        app.use(proxyMiddleware(options.filter || context, options))
    })

    //使用connect-history-api-fallback匹配资源
    //如果不匹配就可以重定向到指定地址
    app.use(require('connect-history-api-fallback')())

    // 应用devMiddleware中间件
    app.use(devMiddleware)

    // 配置express静态资源目录
    const staticPath = path.posix.join('/', 'assets')
    app.use(staticPath, express.static('./assets'))

    const uri = 'http://localhost:' + port

    var _resolve
    var _reject
    var readyPromise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })

    var server
    var portfinder = require('portfinder')
    portfinder.basePort = port
        // console.log(compiler);
    console.log('> Starting dev server...')
        //编译成功后打印uri
    devMiddleware.waitUntilValid(() => {
        portfinder.getPort((err, port) => {
            if (err) {
                _reject(err)
            }
            process.env.PORT = port
                //启动express服务
            portIsOccupied(port, portIsOccupied)
        })
    })
    var appServer;
    // 监听端口是否被占用
    function portIsOccupied(port, cb) {
        // 创建服务并监听该端口
        var server1 = net.createServer().listen(port)

        server1.on('listening', function() { // 执行这块代码说明端口未被占用
            server1.close() // 关闭服务
            server = app.listen(port, function(err) {
                    if (err) {
                        // console.log(err)
                        return;
                    }
                    let IP = getIP()
                    let moduleName;
                    if (root[1] === '*') {
                        moduleName = 'index';
                    } else {
                        moduleName = root[1];
                    }
                    var uri = IP + port + '/' + moduleName + '/' + moduleName + '.html';
                    console.log('Project running at ' + IP + port + '\n')
                        // opn(uri)
                        // 满足条件则自动打开浏览器
                    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
                        opn(uri)
                    }
                    console.log('server-------------------end')
                        // server = app.listen(port)
                    _resolve()
                })
                // console.log('The port【' + port + '】 is available.') // 控制台输出信息
        })

        server1.on('error', function(err) {
            cb(++port, cb);
        })
    }
    //  获取IP地址函数
    function getIP() {
        var ifaces = os.networkInterfaces();
        for (var i in ifaces) {
            if (!ifaces[i].length) {
                continue;
            }
            let ips = ifaces[i];
            for (var i = 0; i < ips.length; i++) {
                if (ips[i].family != 'IPv4') continue;
                if (ips[i].address === '127.0.0.1') continue;
                return 'http:\/\/' + ips[i].address + ':';
            }
        }
    }
    return {
        ready: readyPromise,
        close: () => {
            server.close()
        }
    }

}