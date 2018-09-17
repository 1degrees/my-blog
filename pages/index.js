import React, { Component }from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import axios from 'axios'
import qs from 'qs'

const Banner = dynamic(import('../components/banner'));
const Blogsbox = dynamic(import('../components/blogsbox'));
const Sidebar = dynamic(import('../components/sidebar'));

class Index extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Index-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Index-----')
    super(props);
    this.state = {  articles : [] };
  }

  componentWillMount(){
    let query = qs.stringify({ "tag": "学无止境-html,学无止境-CSS3,学无止境-js,学无止境-frame" });
    axios.get(`/articles/list?${query}`)
      .then(rs =>{
        this.setState({ articles: rs.data.list })
      })
  }

  componentDidMount(){
    console.log('------componentDidMount--Index-----');
    //等待js库加载完成
    let timer = setInterval(e => {
      if(typeof scrollReveal != "undefined" &&typeof $ != "undefined" &&
        $('#banner > li').length == 3 && $('#banner').easyFader) {
        window.scrollReveal = new scrollReveal({ reset: true });
        $('#banner').easyFader();
        clearInterval(timer);
      }
    }, 200);
  }

  render() {
    return (
        <Layout>
          <Head>
            <script defer src="/static/js/jquery.easyfader.min.js"></script>
            <script defer src="/static/js/scrollReveal.js"></script>
          </Head>
          <article> 
            <Banner articles={ this.state.articles }></Banner>
            <Blogsbox articles={ this.state.articles }></Blogsbox>
            <Sidebar articles={ this.state.articles }></Sidebar>
          </article>
        </Layout>
    )
  }
}

export default withRouter(Index)