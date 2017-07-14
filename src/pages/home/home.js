import React, { Component } from 'react';
import HomePostItem from '../../components/home-post-item.js';
import $ from 'jquery';

require('./home-page-style.css');

var IM1 = require('./accest/1.png');

class HomePage extends Component {    
    constructor(props){
        super(props);
        this.state = {
            Data: []
        }

    }

    componentDidMount() {
        // Get all blog here 
        var self = this;
        $.ajax({
            url: '/get-all-blog',
            type: 'POST',
            success: (data) => {
                self.setState({Data: data});
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    render() {
        return (
            <div className="home-page container">
                <h1> Home page </h1>
                {
                   this.state.Data.map((value, index) => {
                       return <HomePostItem isV={ true } key={ this.state.Data.length - index - 1} Data= { this.state.Data[ this.state.Data.length - index - 1]} />
                   })
                }
            </div>
        );
    }
}

export default HomePage;