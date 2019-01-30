import React, { Component }from 'react'
import { getArtListByTag } from '../../service';
export default class Article extends Component {
    constructor(props){
        super(props);
        this.state = { article: {} };
    }

    componentDidMount(){
        getArtListByTag({ title : this.props.title }).then(rs => {
            let article = rs.data.list[0];
            this.setState({ article })
        });
    }
  
    render(){
       let { article } = this.state; 
        return (
            <div className="infosbox">
                <div className="newsview" dangerouslySetInnerHTML={{__html: article.content}}>
                </div>
            </div>
        )
    }
} 