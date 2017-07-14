import React, { Component } from 'react';
import $ from 'jquery';

class HomePostItem extends Component {
    constructor(props) {
        super(props);
        if(!this.props.isV) { this.props.Data.id = "#"; }

        this.state = {categorys: []};
    }

    componentDidMount() {
        const categorys = this.props.Data.category;
        this.setState({categorys: JSON.parse(categorys)});
    }
    
    isRenderValue(){
        console.log( this.props.isV );
        if( this.props.isV) {
            return (
                <div>
                    <div className="show-post-post-value" id={"show-value-post" + this.props.Data.id }>
                        { this.handlingValue() }
                    </div>
                    <div className="post-item-footer">
                        <a href={"/writting/post/" + this.props.Data.id }> Continute reading </a>
                    </div>
                    <hr/>
                </div>
            )
        }
    }
    
    handlingValue(){
        var self = this;
        $(document).ready(function(){
            // $(".show-post-post-value").empty();
            $("#show-value-post" + self.props.Data.id).append($.parseHTML( self.props.Data.value ));
        })
    }
    
    handlingShowImage(){
        console.log(this.props.Data.image);
        if(this.props.Data.image){
            return (
                <div className="show-post-image">
                    <img src={ this.props.Data.image } alt="Image about this post "/>
                </div>
            )
        }
    }
    
    handlingShowTitle(){
        if( this.props.isV ){
            return ( <a href={"/writting/post/" + this.props.Data.id }> { this.props.Data.title } </a> )
        }else{
            return ( <a href="#"> { this.props.Data.title } </a> )
        }
    }
    
    handlingShowTag(){
        if(this.props.Data.tag){
            return (
                <span className="show-blog-tags">
                    Tags: 
                    <span>
                        <a className="show-blog-tag-item"  href={ "/writting/tag/" + this.props.Data.tag}> { this.props.Data.tag }</a> 
                    </span>
                </span>
            )
        }
    }
    
    render() {
        return (
            <div className="post-item-home-page">
                { this.handlingShowImage() }
                <div className="show-post-title">
                    <h2>
                        { this.handlingShowTitle() }
                    </h2>
                </div>
                <div className="show-post-blog-meta-category">
                    <span className="show-image-icon-is-image">
                        <a href="#">
                            <i className="fa fa-camera-retro" />
                        </a>
                    </span>
                    <span className="show-blog-categorys">
                        In:                         
                        {this.state.categorys.map((category, index) => {
                            return (
                                <a className="show-blog-category-item"  href={ "/writting/category/" + category}> { category }</a> 
                            )
                        })}
                    </span>
                        { this.handlingShowTag() }
                    <span className="show-blog-date">
                        { this.props.Data.date }
                    </span>
                </div>
                { this.isRenderValue() }
            </div>
        );
    }
}

export default HomePostItem;