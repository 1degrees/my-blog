import React, { Component }from 'react'
import Layout from '@components/view/Layout'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'

const Article = dynamic(import('../components/article'));
const Sidebar = dynamic(import('../components/aSidebar'));

class Articles extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Contents-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Contents-----')
    super(props)
  }

  componentDidMount(){
    console.log('------componentDidMount--Contents-----')
  }

  render() {
    let { query } = this.props.router,
        { title } = query;
    return (
        <Layout>
          <div className="pagebg ab"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">文章详情</a></h1>
            <Article link={ title }></Article>
            <Sidebar></Sidebar>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Articles)