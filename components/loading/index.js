import React, {Component} from 'react';
import objEvent from '@utils/observer'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title:  "加载中"
        }
    }

    componentDidMount(){
        objEvent.add('LOADING', this.load)
    }

    componentWillUnmount(){
        objEvent.remove('LOADING', this.load);
    };

    load = (isLoading = false, title = "加载中") => {
        this.setState({isLoading, title});
    };

    render() {
        const {isLoading, title} = this.state;
        return isLoading ? (<div className="loading-transition">
            <div className="load-5">
                <p>{title}</p>
                <div className="k-ring-new" style={{border:'hidden'}}>
                    <div className="l l1"><span /></div>
                    <div className="l l2"><span /></div>
                    <div className="l l3"><span /></div>
                    <div className="l l4"><span /></div>
                    <div className="l l5"><span /></div>
                    <div className="l l6"><span /></div>
                    <div className="l l7"><span /></div>
                    <div className="l l8"><span /></div>
                    <div className="l l9"><span /></div>
                    <div className="l l10"><span /></div>
                </div>
            </div>
        </div>) : null
    }
}

export default Loading;