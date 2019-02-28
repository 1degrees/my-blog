import React, { Component }from 'react'
import Layout from '@components/view/Layout'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import { getArtListByTag } from '../service';

const ArticleDetail = dynamic(import('../components/article'));
const Sidebar = dynamic(import('../components/aSidebar'));

class Article extends Component {
  static async getInitialProps ({ req, query }) {
    let article = {};
    await getArtListByTag({ aid : query.id }).then(rs => {
      article = rs.data.list[0];
    });
    return { article }
  }

  constructor (props) {
    super(props)
  }

  render() {
    let { article } = this.props;
    return (
        <Layout>
          <div className="pagebg ab"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">文章详情</a></h1>
            <ArticleDetail data={ article }></ArticleDetail>
            <Sidebar></Sidebar>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Article)