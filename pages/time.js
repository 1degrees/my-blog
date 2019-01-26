import Head from 'next/head'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import { getTimeList } from '../service';

class Time extends Component {
  static async getInitialProps ({ req }) {
    let timers = [];
    await getTimeList().then(rs => {
      timers = rs.data.list;
    }).catch(err => {
      console.warn(err);
    })
    return { timers }
  }

  constructor (props) {
    super(props)
  }

  render() {
    let { timers } = this.props;
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