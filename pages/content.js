<<<<<<< HEAD
import dynamic from 'next/dynamic'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import { getHomeArticles } from '../service'
import Layout from '@components/view/Layout'
=======
import dynamic from 'next/dynamic';
import React, { Component }from 'react';
import Layout from '@components/view/Layout';
import _ from 'lodash'
import Router, { withRouter } from 'next/router';
import { getArtList } from '../service';
>>>>>>> dev
const Blogsbox = dynamic(import('../components/blogsbox'));
const Sidebar = dynamic(import('../components/sidebar'));

class Contents extends Component {
<<<<<<< HEAD
  static getInitialProps ({ req, query }) {
    let tags = {
      htm : '学无止境-html',
      css : '学无止境-CSS3',
      js : '学无止境-js',
      frame : '学无止境-frame'
    }
    let blogs = [];
    await getHomeArticles({ "tag": tags[query.id] }).then(rs =>{
      blogs =  rs.data.list
    })
    return { blogs }
=======
  static async getInitialProps ({ req }) {
    let arts = []
    await getArtList({ "tag": "学无止境-html,学无止境-CSS3,学无止境-js,学无止境-frame" })
    .then(rs => {
      arts = rs.data.list;
    })
    return { arts }
>>>>>>> dev
  }

  constructor (props) {
    super(props);
<<<<<<< HEAD
    let { blogs } = props;
    this.state = { articles, blogs }
  }

  updateBlogs = nextProps => {
    console.log("----------updateBlogs-----------");
    let { query } = nextProps.router,
        { id } = query;
    let blogs = articles.filter((e,i) => e.tag.toLocaleLowerCase().includes(id))
    this.setState({ blogs });
=======
    let blogs = this.updateBlogs(props);
    this.state = { blogs }
>>>>>>> dev
  }

  updateBlogs = props => {
    let { router: { query : { id } }, arts } = props,
        blogs = [];
    blogs = arts.filter((e,i) => e.tag.toLocaleLowerCase().includes(id));
    return blogs
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(nextProps.router, this.props.router)){
      this.setState({
        blogs : this.updateBlogs(nextProps)
      });
    }
  }

  render() {
    const { blogs } = this.state;
    const { arts } = this.props;
    return (
        <Layout>
          <div className="pagebg abc"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">内容页</a></h1>
            <Blogsbox articles={ blogs }></Blogsbox>
            <Sidebar articles={ arts }></Sidebar>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Contents)