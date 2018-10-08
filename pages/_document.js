/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-29 14:20:01 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-10-08 17:39:33
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
          <link href="/_next/static/style.css" rel="stylesheet"/>
          <link href="/static/css/base.css" rel="stylesheet"/>
          <link href="/static/css/index.css" rel="stylesheet"/>
          <link href="/static/css/m.css" rel="stylesheet"/>
          <script src="/static/js/modernizr.js"></script>
          <script src="/static/js/jquery.min.js"></script>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}