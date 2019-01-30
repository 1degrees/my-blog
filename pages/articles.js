import _ from 'lodash';
import dynamic from 'next/dynamic';
import React, { Component }from 'react';
import { getArtList } from '../service';
import Layout from '@components/view/Layout';
import Router, { withRouter } from 'next/router';

const Blogsbox = dynamic(import('../components/blogsbox'));
const Sidebar = dynamic(import('../components/sidebar'));

class Articles extends Component {
  static async getInitialProps ({ req }) {
    let arts = []
    await getArtList({ "tag": "旅游日记,程序人生,语录心得" })
    .then(rs => {
      arts = rs.data.list;
    })
    return { arts }
  }

  constructor (props) {
    super(props);
    let blogs = this.updateBlogs(props);
    this.state = { blogs }
  }

  updateBlogs = props => {
    let tabs = {"lifes": "程序人生", "travel": "旅游日记", "ngc": "语录心得"},
        { router: { query : { id } }, arts } = props,
        blogs = [];
    blogs = arts.filter((e,i) => e.tag.toLocaleLowerCase().includes(tabs[id]))
    return blogs;
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(nextProps.router, this.props.router)){
      this.setState({ blogs : this.updateBlogs(nextProps) });
    }
  }

  render() {
    let { blogs } = this.state;
    let { arts } = this.props;
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

export default withRouter(Articles)