import React, { Component } from 'react';
import HomePostItem from '../../components/home-post-item.js';
import $ from 'jquery';

require('./home-page-style.css');

var IM1 = require('./accest/1.png');

class HomePage extends Component {    
    constructor(props){
        super(props);
        this.state = {
            Data: [
                // {
                //     id: 11,
                //     image: IM1,
                //     title: 'Restaurant Employer Read Clients Orders On His iPad',
                //     category: 'nodejs',
                //     tag: 'city',
                //     time: 'March 16 20117',
                //     value: "<strong>'It’s no secret that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, responding to the new possibilities available. However, the industry is fast becoming overcrowded, heaving with agencies offering similar services — on the surface, at least. Producing creative, fresh projects is the key to standing out. Unique side projects are the best place to innovate, but balancing commercially and creatively lucrative work is tricky. So, this article looks at …', </strong>",
                //     date: new Date().toLocaleDateString()
                // }
            ]
        }

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