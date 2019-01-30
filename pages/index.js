import React, { Component }from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import LoaderLib from '@components/LoaderLib'
import Layout from '@components/view/Layout'
import { getHomeArticles } from '../service'

const Banner = dynamic(import('../components/banner'));
const Blogsbox = dynamic(import('../components/blogsbox'));
const Sidebar = dynamic(import('../components/sidebar'));

class Index extends Component {
  static async getInitialProps ({ req }) {
    let articles = [];
    await getHomeArticles({
      "tag": "学无止境-html,学无止境-CSS3,学无止境-js,学无止境-frame"
    }).then(rs =>{
      articles =  rs.data.list
    })
    return {isServer: !!req, articles}
  }

  constructor (props) {
    super(props);
    const { articles } = props;
    this.state = {  articles };
  }

  componentWillMount(){
  }

  componentDidMount(){
    //等待js库加载完成
    LoaderLib($, scrollReveal).then(rs=>{
      window.scrollReveal = new scrollReveal({ reset: true });
      $('#banner').easyFader();
    })
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