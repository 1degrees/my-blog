/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-23 13:45:26
 * @file: next配置文件（包括webpack，静态路由等等）
 */
const path = require('path');
const withLess = require('@zeit/next-less');
const Dotenv = require('dotenv-webpack');
const { isBuild } = require('./config');

module.exports = withLess({
  lessLoaderOptions: { javascriptEnabled: true },
  webpack: function (config, { defaultLoaders, isServer }) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|ico|jpeg|bmp)$/,
      exclude: path.resolve(__dirname, './node_modules'),
      use: [{ loader: 'url-loader' }]
    })

    config.plugins.push(
      new Dotenv({//读取对应环境变量
        path: path.resolve(__dirname,`./env/.env.${process.env.NODE_ENV_API}`),
        safe: false,
        systemvars: false
      })
    )

    //设置别名
    config.resolve.alias["@data"] = path.resolve(__dirname, './data');
    config.resolve.alias["@utils"] = path.resolve(__dirname, './utils');
    config.resolve.alias["@config"] = path.resolve(__dirname, './config');
    config.resolve.alias["@components"] = path.resolve(__dirname, './components');
    return config
  }
});

console.log('-----运行环境-----', process.env.NODE_ENV, '\n',
            '-----运行API-----', process.env.NODE_ENV_API);