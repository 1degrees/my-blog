import React, { Component }from 'react';

export default class sidebar extends Component {
  constructor (props) {
    super(props);
  }

  followTop = 2800

  scroll = () => {
    if (window.scrollY - this.followTop > 0) {
      !$('#follow-us').hasClass('gd') && $('#follow-us').addClass('gd');
    } else {
      $('#follow-us').removeClass('gd');
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.followTop = !$('#follow-us')[0] ? this.followTop : $('#follow-us').offset().top
    },2000);
    $(window).on('scroll', this.scroll);
  }
  
  componentWillUnmount(){
    $(window).off('scroll',this.scroll);
  }

  render(){
    let { articles } = this.props;
    let recomArt = articles.filter((e,i) => {
      return e.views > 300;
    }), sRecomArt = articles.filter((e,i) => {
      return e.likes > 100;
    }), rankArt = articles.filter((e,i) => {
      return e.views > 100;
    });
    rankArt = rankArt.sort((a,b) => {
      return a.views - b.views;
    })
    return (
      <div className="sidebar">
        <div className="zhuanti">
          <h2 className="hometitle">特别推荐</h2>
          <ul>
            {
              sRecomArt.map((e,i) => {
                return (<li key={ i }> 
                          <i><img src={ e.images[0] }/></i>
                          <p>{ e.title }<span><a href={ e.link }>阅读</a></span> </p>
                        </li>)
              })
            }
          </ul>
        </div>
        <div className="tuijian">
          <h2 className="hometitle">推荐文章</h2>
          {
            recomArt.slice(0,1).map((e,i) => {
              return (<ul className="tjpic" key={ i }>
                        <i><img src={ e.images[0] }/></i>
                        <p><a href={ e.link }>{ e.title }</a></p>
                      </ul>)
            })
          }
          
          <ul className="sidenews">
            {
              recomArt.slice(1,3).map((e,i) => {
                return (<li key={ i }> 
                          <i><img src={ e.images[0] }/></i>
                          <p><a href={ e.link }>{ e.title }</a></p>
                          <span>{ e.time }</span> 
                        </li>)
              })
            }
          </ul>
        </div>
        <div className="tuijian">
          <h2 className="hometitle">点击排行</h2>
          <ul className="tjpic">
            <i><img src="/static/images/toppic01.jpg"/></i>
            <p><a href="/">别让这些闹心的套路，毁了你的网页设计</a></p>
          </ul>
          <ul className="sidenews">
            {
              rankArt.slice(0,3).map((e,i) => {
                return (<li key={ i }> 
                          <i><img src={ e.images[0] }/></i>
                          <p><a href={ e.link }>{ e.title }</a></p>
                          <span>{ e.time }</span> 
                        </li>)
              })
            }
          </ul>
        </div>
        <div className="cloud">
          <h2 className="hometitle">标签云</h2>
          <ul>
            <a href="/">CSS</a> <a href="/">JavaScript</a> <a href="/">html5</a> <a href="/">程序人生</a> <a href="/">青春</a> <a href="/">旅游</a>
          </ul>
        </div>
        <div className="links">
          <h2 className="hometitle">友情链接</h2>
          <ul>
            <li><a href="https://www.zhihu.com/people/he-shi-qiu-feng-bei-hua-shan-22/posts" target="_blank">知乎</a></li>
            <li><a href="https://github.com/1degrees" target="_blank">GitHub</a></li>
            <li><a href="http://www.wanshifu.com/" target="_blank">万师傅官网</a></li>
          </ul>
        </div>
        <div className="guanzhu" id="follow-us">
          <h2 className="hometitle">关注我们 么么哒！</h2>
          <ul>
            <li className="sina"><a href="/" target="_blank"><span>新浪微博</span>张啸的微博</a></li>
            <li className="tencent"><a href="/" target="_blank"><span>腾讯微博</span>张啸的博客</a></li>
            <li className="qq"><a href="/" target="_blank"><span>QQ号</span>1103085816</a></li>
            <li className="email"><a href="/" target="_blank"><span>邮箱帐号</span>zhangxiao@wshifu.com</a></li>
            <li className="wxgzh"><a href="/" target="_blank"><span>微信号</span>原来是你二</a></li>
            <li className="wx"><img src="/static/images/wx.jpg"/></li>
          </ul>
        </div>
      </div>
    )
  }
}
