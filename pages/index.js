import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import LoaderLib from '@utils/loaderLib';
import { getArtList } from '../service';

const Layout = dynamic(import('@components/view/Layout'));
const Banner = dynamic(import('@components/banner'));
const Blogsbox = dynamic(import('@components/blogsbox'));
const Sidebar = dynamic(import('@components/sidebar'));

class Index extends Component {
  static async getInitialProps ({ req }) {
    let arts = [];
    await getArtList({ "tag": "学无止境-html,学无止境-CSS3,学无止境-js,学无止境-frame" })
          .then(rs => {
            arts = rs.data.list
          }).catch(err => {
            console.warn(err);
          });
    return { arts }
  }

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    //等待js库加载完成
    let $ = window.$, 
    scrollReveal = window.scrollReveal;
    LoaderLib($, scrollReveal).then(rs => {
      new scrollReveal({ reset: true });
      $('#banner').easyFader();
    })
  }

  render() {
    let { arts } = this.props;
    return (
        <Layout>
          <Head>
            <script defer src="/static/js/jquery.easyfader.min.js"></script>
            <script defer src="/static/js/scrollReveal.js"></script>
          </Head>
          <article> 
            <Banner articles={ arts }></Banner>
            <Blogsbox articles={ arts }></Blogsbox>
            <Sidebar articles={ arts }></Sidebar>
          </article>
        </Layout>
    )
  }
}

export default withRouter(Index)