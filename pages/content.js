import React, { Component }from 'react'
import Layout from '@components/view/Layout'
import dynamic from 'next/dynamic'
import Router, { withRouter } from 'next/router'
import axios from 'axios'
import qs from 'qs'

const Blogsbox = dynamic(import('../components/blogsbox'));
const Sidebar = dynamic(import('../components/sidebar'));
let articles = [];

class Contents extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Contents-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Contents-----')
    super(props);
    let blogs = [];
    this.state = { articles, blogs }
  }

  updateBlogs = nextProps => {
    console.log("----------updateBlogs-----------");
    let { query } = nextProps.router,
        { id } = query;
    let blogs = articles.filter((e,i) => e.tag.toLocaleLowerCase().includes(id))
    this.setState({ blogs });
  }

  componentWillMount(){
    let query = qs.stringify({ "tag": "学无止境-html,学无止境-CSS3,学无止境-js,学无止境-frame" });
    axios.get(`/articles/list?${query}`)
      .then(rs =>{
        articles = rs.data.list;
        this.setState({ articles });
        this.updateBlogs(this.props);
      })
  }

  componentWillReceiveProps(nextProps){
    console.log('------componentWillReceiveProps--Contents-----')
    this.updateBlogs(nextProps);
  }

  render() {
    return (
        <Layout>
          <div className="pagebg abc"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">内容页</a></h1>
            <Blogsbox articles={ this.state.blogs }></Blogsbox>
            <Sidebar articles={ this.state.articles }></Sidebar>
          </div>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Contents)