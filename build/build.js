//编译入口文件
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'// 设置当前环境为生产环境

const ora = require('ora')//loading...进度条
const rm = require('rimraf')//删除文件 'rm -rf'
const path = require('path')
const chalk = require('chalk') //stdout颜色设置
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('正在编译...')
spinner.start()

// 清空文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 删除完成回调函数内执行编译
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 编译完成，输出编译文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  编译失败出现错误.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('   编译成功.\n'))
    console.log(chalk.yellow(
      '  file:// 无用，需http(s)://.\n'
    ))
  })
})
