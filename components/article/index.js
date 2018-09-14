import React, { Component }from 'react'
import axios from 'axios'
import qs from 'qs'
import { $mobx } from 'mobx';

let article = '';
export default class Article extends Component {
    constructor(props){
        super(props);
        this.state = { article };
    }

    componentDidMount(){
        let query = qs.stringify({ "title": this.props.link });
        axios.get(`/articles/list?${query}`)
            .then(rs =>{
            article = rs.data.list[0];
            $('.infosbox > .newsview').html(article.content)
            })
    }
  
    render(){
      return (
        <div className="infosbox">
            <div className="newsview">
            </div>
        </div>)
    }
} 