/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-10-08 16:31:45
 * @file: next配置文件（包括webpack，静态路由等等）
 */

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withLess = require('@zeit/next-less');

console.log(process.env.NODE_ENV);

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: function (config, { defaultLoaders, isServer }) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: { name: 'dist/[path][name].[ext]' },
        },
        'babel-loader',
        'styled-jsx-css-loader',
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpg|gif|ico|jpeg|bmp)$/,
      exclude: path.resolve(__dirname, './node_modules'),
      use: [{ loader: 'url-loader' }]
    })


    config.plugins.push(
      new Dotenv({//读取对应环境变量
        path: path.resolve(__dirname,`./env/.env.${process.env.NODE_ENV}`)
      })
    )
      console.log(path.resolve(__dirname,`./env/.env.${process.env.NODE_ENV}`))
    //设置别名
    config.resolve.alias["@components"] = path.resolve(__dirname, './components');
    config.resolve.alias["next-seo"] = path.resolve(__dirname, './components/next-seo');
    
    return config
  }
})
