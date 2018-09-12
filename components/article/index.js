import axios from 'axios'
import React, { Component }from 'react'

export default class Article extends Component {
    componentWillMount(){
        console.log('articlearticlearticlearticle')
        axios.get('https://wsf.zhihu.com/p/37744733').then(rs=>{
            console.log(rs);
        })
    }
  
    render(){
      return (
        <div className="news_infos">
        </div>)
    }
} 