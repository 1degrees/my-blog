import React, { Component }from 'react'
export default class Article extends Component {
    constructor(props){
        super(props);
    }
  
    render(){
       let { data } = this.props; 
        return (
            <div className="infosbox">
                <div className="newsview" dangerouslySetInnerHTML={{__html: data.content}}>
                </div>
            </div>
        )
    }
} 