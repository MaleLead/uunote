'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
    // 复制插件
module.exports = function(root) {
    let assetsRoot = path.resolve(__dirname, '../dist/' + root);
    let publickPath = 'assets';
    // console.log(assetsRoot, '----------------------------------------')
    // 获取loader配置文件
    // const utils = require('./utils')(root)
    // 获取路径 source static 配置文件
    // const config = require('../config')(root)
    // 获取vue-loader 配置项
    // console.log(getEntry);
    // 获取入口js文件
    let entries = require('./get-entries')(root);
    const htmls = require('./get-entries')(root, 'html')
    const webpackConfig = {
        entry: entries,
        output: {
            // 打包文件和调试服务器的根目录 
            path: assetsRoot, //导出目录的绝对路径
            // 输出路径以及名字
            filename: '[name]/[name].js', //导出文件的文件名
            // 热重载路径
            publicPath: '/', //生产模式或开发模式下html、js等文件内部引用的公共路径
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'], //自动解析确定的拓展名,使导入模块时不带拓展名
            alias: { // 创建import或require的别名
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            },
        },
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
                },
                {
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
        plugins: [
            //分离出的css文件名
            new ExtractTextPlugin({
                filename: '[name]/[name].css', 
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: function(module) {
                    // any required modules inside node_modules are extracted to vendor
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
    }
    for (let name in htmls) {
        if (!htmls.hasOwnProperty(name)) continue;
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
                filename: name + '/'+name+'.html', //生成的html的文件名
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