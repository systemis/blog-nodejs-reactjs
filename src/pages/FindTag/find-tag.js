import React, {Component} from 'react'
import HomePostItem from '../../components/home-post-item.js';

import $ from 'jquery';

class FindTagPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            Data: []
        }
        var self = this;

        $.ajax({
            url: '',
            type: 'post',
            success: (data) => {
                if(data.length > 0){
                    self.setState({Data: data});
                }
            }
        })
    }
    render () {
        console.log(this.props);
        return (
            <div className="find-cate-gory-page">
                <h1> Find category </h1>
                {
                   this.state.Data.map((value, index) => {
                       return <HomePostItem isV={ true } key={ this.state.Data.length - index - 1} Data= { this.state.Data[ this.state.Data.length - index - 1]} />
                   })
                }
            </div>
        )
    }
}

export default FindTagPage