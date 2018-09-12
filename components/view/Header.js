import Link from 'next/link'
import menus  from '../../data/header'
import React, { Component }from 'react'

const Menu = list => list.map((e,i) => {
    let item;
    if(e.child){
      item = (<li key={ e.title }>
                <a >{ e.title }</a>
                <ul className="sub-nav" style={{"display": "none"}}>
                  {
                    Menu(e.child)
                  }
                </ul>
              </li>)
    } else {
      item = <Link href={ e.href || e.link } as={ e.link }  key={ e.title }><li><a>{ e.title }</a></li></Link>
    }
    return item
})

const Mnav = (list, unfoldNav) => list.map((e,i) => {
  let item;
  if(e.child){
    item = (<dt className="list_dt" onClick={ unfoldNav } key={ e.title }>
              <a>{ e.title }</a>
              <dl className="list_dd">
                  { Mnav(e.child) }
              </dl>
            </dt>)
  } else {
    item = <Link href={ e.href || e.link } as={ e.link }  key={ e.title }><dt className="list_dt"><a>{ e.title }</a></dt></Link>;
  }
  return item
})

export default class Headers extends Component {
  constructor (props) {
    super(props);
    this.state = {  menus };
  }

  unfoldNav = (event) => {
    let $el = $(event.currentTarget);
    if ($el.attr('id') == 'open') {
      $el.removeAttr('id').find('dl').slideUp();
    } else {
      $el.attr('id', 'open').find('dl').slideDown();
    }
  }

  openOrClose = (evnet) =>{
    let oH2 =document.querySelector('h2.mtitle');
    let oUl = document.querySelector('dl.list_dl');
    let style = oUl.style;
    style.display = style.display == 'block' ? 'none' : 'block';
    oH2.className = style.display == 'block' ? 'open mtitle' : 'mtitle';
  }

  search = (evnet) => {
    /*search*/
    $('.search_bar').toggleClass('search_open');
    if ($('#keyboard').val().length > 2) {
        $('#keyboard').val('');
        // $('#searchform').submit();
    } else {
        return false;
    }
  }

  componentDidMount(){
    $('.nav>li').hover(function() {
        $(this).children('ul').stop(true, true).show(400);
    }, function() {
        $(this).children('ul').stop(true, true).hide(400);
    });
  }

  render(){
    let { menus } = this.state;
    return (<header> 
              <div className="menu">
                <nav className="nav" id="topnav">
                  <h1 className="logo"><a href="/">羡慕城里的娃</a></h1>
                  { Menu(menus) }
                  <div id="search_bar" className="search_bar">
                    <form id="searchform" action="" method="post" name="searchform">
                      <input id="keyboard"className="input" type="text" name="keyboard" placeholder="想搜点什么呢..."/>
                      <input type="hidden" name="show" value="title"/>
                      <input type="hidden" name="tempid" value="1"/>
                      <input type="hidden" name="tbname" value="news"/>
                      <input type="hidden" name="Submit" value="搜索"/>
                      <span className="search_ico" onClick={ this.search }></span>
                    </form>
                  </div>
                </nav>
              </div>
              <div id="mnav">
                <h2 className="mtitle" onClick={ this.openOrClose }><a href="/" className="mlogo">那个人博客</a><span className="navicon"></span></h2>
                <dl className="list_dl" style={{"display": "none"}}>
                  { Mnav(menus,this.unfoldNav) }
                </dl>
              </div>
            </header>)
  }
} 