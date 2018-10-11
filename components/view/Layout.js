/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-10-11 14:17:40
 * @file: 页面布局组件
 */

import React, { Component }from 'react'
import Headers from './Header'
import Footer from './Footer'

import '../../asserts/css/styles.less'

class Layout extends Component {
  componentDidMount(){
    //回到顶部
    let offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    window.onscroll = function () {
        $(this).scrollTop() > offset ?
          $back_to_top.addClass('cd-is-visible') :
          $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    };

    $back_to_top.off('click').on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
        );
    });
  }

  componentWillUnmount(){
    window.onscroll = null;
  }

  render () {
    let { children } = this.props;
    return (
      <div style={{ "position": "relative","zIndex": 0 }}>
        <Headers/>
        {children}
        <a className="cd-top">Top</a>
        <Footer/>
      </div>
    )
  }
}

export default Layout;