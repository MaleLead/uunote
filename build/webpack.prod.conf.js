'use strict'

// require('./check-versions')()
const merge = require('webpack-merge')
const ora = require('ora') //终端显示的转轮loading
const rm = require('rimraf') //node环境下rm -rf的命令库
const path = require('path') //文件路径处理库
const chalk = require('chalk') //终端显示带颜色的文字
const webpack = require('webpack')
    // 复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
    // 入口html文件处理插件
    // const HtmlWebpackPlugin = require('html-webpack-plugin')
    // css提取插件
    // const ExtractTextPlugin = require('extract-text-webpack-plugin')
    // 它将在Webpack构建期间搜索CSS资源, 将css文件最小化处理
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = function(root) {
    const baseWebpackConfig = require('./webpack.base.conf')(root)

    const env = {
        NODE_ENV: '"production"'
    }

    const webpackConfig = merge(baseWebpackConfig, {
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
                from: path.resolve(__dirname, '../src/' + root + '/assets'),
                to: path.resolve(baseWebpackConfig.output.path, 'assets'),
                ignore: ['.*'] //忽视.*文件
            }])
        ]
    })
    process.env.NODE_ENV = 'production' //设置当前环境为production
        // 在终端显示ora库的loading效果
    const spinner = ora('building for production...')
    spinner.start()
        // console.log(webpackConfig.plugins)
        // 删除已编译文件
    rm(path.join(webpackConfig.output.path, 'assets'), err => {
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