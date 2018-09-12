import Head from 'next/head'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'

class Game extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Note-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Note-----')
    super(props)
  }

  componentDidMount(){
    console.log('------componentDdMount--Note-----')
    let timer = setInterval(e => {
      console.log('------timer------');
      if(typeof wangEditor != "undefined") {
        new wangEditor('#editor').create();
        clearInterval(timer);
      }
    }, 200)
  }

  render() {
    return (
        <Layout>
          <Head>
            <script defer src="//unpkg.com/wangeditor/release/wangEditor.min.js"/>
            <link rel="stylesheet" href="//unpkg.com/wangeditor/release/wangEditor.min.css"/>
          </Head>
          <div className="pagebg sh"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">记录每一刻</a></h1>
            <div id="editor" className="share editor"></div>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Game)