import Head from 'next/head'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import game from '../game/main'
class Game extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Game-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Game-----')
    super(props)
  }

  componentDidMount(){
    console.log('------componentDdMount--Game-----')
    game();
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
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">开心时刻</a></h1>
            <div id="all-canvas" className="share game">
              <canvas id="canvas1" width='800' height='600'></canvas>
              <canvas id="canvas2" width='800' height='600'></canvas>
            </div>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Game)