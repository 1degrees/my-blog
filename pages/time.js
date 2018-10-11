import Head from 'next/head'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import axios from 'axios'
import BASE_URL from '../config'

class Time extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Time-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Time-----')
    super(props);
    this.state = { timers : [] };
  }

  componentWillMount(){
    console.log('------componentDdMount--Time-----')
    axios.get(`${BASE_URL.url}/articles/list`)
      .then(rs =>{
        let timers = rs.data.list;
        this.setState({ timers });
      })
  }

  render() {
    let { timers } = this.state;
    return (
        <Layout>
          <div className="pagebg timer"></div>
          <div className="container">
              <h1 className="t_nav"><span>时光飞逝，机会就在我们眼前，何时找到了灵感，就要把握机遇，我们需要智慧和勇气去把握机会。</span><a href="/" className="n1">网站首页</a><a href="/" className="n2">时间轴</a></h1>
              <div className="timebox">
                  <ul id="list">
                      {
                        timers.map((e,i)=>{
                          return (
                            <li key={ i }><span>{ e.time.slice(0,10) }</span><a target="_blank" href={ e.link } title={ e.title }>{ e.title }</a></li>
                          )
                        })
                      }
                  </ul>
                  <ul id="list2">
                  </ul>
              </div>
          </div>
          <a className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Time)