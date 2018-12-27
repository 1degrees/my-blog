/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-29 14:20:01 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-12-27 19:49:11
 * @file: 全局引入样式，外部组件库页面 (经测试不存react在生命周期)
 */
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link rel="stylesheet" href="/static/css/base.css"/>
          <link rel="stylesheet" href="/static/css/index.css"/>
          <link rel="stylesheet" href="/static/css/m.css"/>
          <script src="/static/js/modernizr.js"></script>
          <script src="/static/js/jquery.min.js"></script>
          <meta name="baidu-site-verification" content="M1eWbs5YNL" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}