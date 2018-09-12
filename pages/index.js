import React, { Component }from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import Layout from '@components/view/Layout'
import articles from '../data/article';

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
    this.state = {  articles };
  }

  componentDidMount(){
    console.log('------componentDidMount--Index-----');
    //等待js库加载完成
    let timer = setInterval(e => {
      console.log('------timer------');
      if(typeof scrollReveal != "undefined" &&
          typeof $ != "undefined" &&
            $('#banner').easyFader) {
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