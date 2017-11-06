'use strict'

const merge = require('webpack-merge')
const ora = require('ora') //终端显示的转轮loading
const rm = require('rimraf') //node环境下rm -rf的命令库
const path = require('path') //文件路径处理库
const chalk = require('chalk') //终端显示带颜色的文字
const webpack = require('webpack')
    // 复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
    // 入口html文件处理插件
    // css提取插件
    // 它将在Webpack构建期间搜索CSS资源, 将css文件最小化处理
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = function(root) {
    if (!root[1]) {
        root[1] = '*';
    }
    const baseWebpackConfig = require('./base')(root)
    const webpackConfig = merge(baseWebpackConfig, {
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            postcss: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            less: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }, {
                                    loader: 'less-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            sass: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }, {
                                    loader: 'sass-loader',
                                    options: { //options是loader的选项配置 
                                        indentedSyntax: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            scss: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }, {
                                    loader: 'scss-loader',
                                    options: { //options是loader的选项配置 
                                        // indentedSyntax: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            stylus: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: { //options是loader的选项配置 
                                        minimize: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }, {
                                    loader: 'stylus-loader',
                                    options: { //options是loader的选项配置 
                                        // indentedSyntax: true, //生成环境下压缩文件
                                        sourceMap: true //根据参数是否生成sourceMap文件
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            styl: ExtractTextPlugin.extract({
                                use: [{
                                        loader: 'css-loader',
                                        options: { //options是loader的选项配置 
                                            minimize: true, //生成环境下压缩文件
                                            sourceMap: true //根据参数是否生成sourceMap文件
                                        }
                                    },
                                    {
                                        loader: 'stylus-loader',
                                        options: { //options是loader的选项配置 
                                            // indentedSyntax: true, //生成环境下压缩文件
                                            sourceMap: true //根据参数是否生成sourceMap文件
                                        }
                                    }
                                ],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: { minimize: true, sourceMap: true }
                        }]
                    })
                },
                {
                    test: /\.postcss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: { minimize: true, sourceMap: true }
                        }]
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true, sourceMap: true }
                            },
                            { loader: 'less-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.sass$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true, sourceMap: true }
                            },
                            { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true, sourceMap: true }
                            },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.stylus$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true, sourceMap: true }
                            },
                            { loader: 'stylus-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.styl$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: { minimize: true, sourceMap: true }
                            },
                            { loader: 'stylus-loader', options: { sourceMap: true } }
                        ]
                    })
                }
            ]
        },
        devtool: '#source-map',
        plugins: [
            // 声明webpack全局生产环境变量
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            // 文件压缩并生成source-map文件
            new webpack.optimize.UglifyJsPlugin({ //js文件压缩插件
                compress: {
                    warnings: false // 不显示警告
                },
                sourceMap: true
            }),
            //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
            new OptimizeCSSPlugin({ // 压缩提取除的css文件
                cssProcessorOptions: {
                    safe: true
                }
            }),
            new webpack.HashedModuleIdsPlugin(),
            // 复制静态资源,将static文件内的内容复制到指定文件夹
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../src/' + root[0] + '/assets'),
                to: path.resolve(baseWebpackConfig.output.path, 'assets'),
                ignore: ['.*'] //忽视.*文件
            }]),
            new ExtractTextPlugin({
                filename: '[name]/[name].css', //分离出的css文件名
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: function(module) {
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, '../node_modules')
                        ) === 0
                    )
                }
            }),
        ]
    })
    process.env.NODE_ENV = 'production' //设置当前环境为production
        // 在终端显示ora库的loading效果
    const spinner = ora('building for production...')
    spinner.start()
        // 删除已编译文件
    let removePath;
    rm(webpackConfig.output.path, err => {
        if (err) throw err
            //在删除完成的回调函数中开始编译
        webpack(webpackConfig, function(err, stats) {
            spinner.stop() //停止loading
            if (err) throw err
                // 在编译完成的回调函数中,在终端输出编译的文件
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
            }

            console.log(chalk.cyan('  Build complete.\n'))
            console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
            ))
        })
    })
}