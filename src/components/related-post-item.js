import React, {Component} from 'react'

class RelatePostItem extends Component {
    constructor(props){
        super(props);

        this.handlingShowImage = this.handlingShowImage.bind(this);
    }
    handlingShowImage(){
        if( this.props.Data.image !== '' && this.props.Data.image !== null){  
            return (
                <div className="show-image">
                    <img src={ this.props.Data.image } alt="Image about post"/>
                </div>
            )
        }
    }
    render () {
        return (
            <div className="relate-post-item col-md-4 col-sm-4">
                <div className="child">
                     { this.handlingShowImage() }
                    <div className="show-title">
                        <h2> <a href={"./" + this.props.Data.id} >{ this.props.Data.title } </a></h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default RelatePostItem