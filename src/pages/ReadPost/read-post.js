import React, { Component } from 'react';
import HomePostItem from '../../components/home-post-item.js';
import RelatePostItem from "../../components/related-post-item.js";
import $ from 'jquery';

import IM1 from '../home/accest/1.png';

require('./read-page-style.css');

class ReadPage extends Component {
    constructor(props){
        super(props);
        const self   = this; 
        this.postId  = this.props.match.params.id;
        this.renderValuePost = this.renderValuePost.bind(this);
        this.state = {
            Data: {
                    // id: 11,
                    // image: IM1,
                    // title: 'Restaurant Employer Read Clients Orders On His iPad',
                    // category: 'nodejs',
                    // tag: 'city',
                    // time: 'March 16 20117',
                    // value: "<strong>'It’s no secret that the digital industry is booming. From exciting startups to global brands, companies are reaching out to digital agencies, responding to the new possibilities available. However, the industry is fast becoming overcrowded, heaving with agencies offering similar services — on the surface, at least. Producing creative, fresh projects is the key to standing out. Unique side projects are the best place to innovate, but balancing commercially and creatively lucrative work is tricky. So, this article looks at …', </strong>",
                    // date: new Date().toLocaleDateString()
                },
            RelatePostsData: []
        }
    }

    componentWillMount() {
        const self   = this; 
        $.ajax({
            url: `/getpost/id/${self.postId}`,
            type: "POST",
            success: (data) => {
                console.log(data);
                self.setState({ Data: data});
            }
        })
        
        $.ajax({
            url: "/get-relate-post",
            type: "post",
            success: (data) => {
                if( data.length > 0){
                    self.setState({RelatePostsData: data});
                }
            }
        })   
    }
    
    renderValuePost(){
        $(document).ready(() => {
            $("#show-value-of-post-to-read").empty();
            $("#show-value-of-post-to-read").append($.parseHTML( this.state.Data.value ));
        })
    }
    
    render() {
        return (
            <div className="read-post-page">
                <h1> Read post  </h1>
                <HomePostItem isV={ false} key={ this.postId } Data={ this.state.Data } />
                <div id="show-value-of-post-to-read">
                    { this.renderValuePost() }
                </div>
                <hr/>
                <div className="show-relates-post row">
                    { this.state.RelatePostsData.map((value, index) => {
                        return <RelatePostItem key={index} Data={value} />
                    })}
                </div>
            </div>
        );
    }
}

export default ReadPage;