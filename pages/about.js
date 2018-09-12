import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import AContent from '../components/aContent'
import ASidebar from '../components/aSidebar'

class About extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--About-----')
    return {isServer: !!req}
  }
  
  constructor (props) {
    console.log('------constructor--About-----')
    super(props);
  }

  componentDidMount(){
    console.log('------componentDidMount--About-----')
  }

  render() {
    return (
        <Layout>
          <div className="pagebg ab"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a href="/about" className="n2">关于我</a></h1>
            <AContent></AContent>
            <ASidebar></ASidebar>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(About)