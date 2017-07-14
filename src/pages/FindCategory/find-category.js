import React, {Component} from 'react'
import HomePostItem from '../../components/home-post-item.js';

import $ from 'jquery';

class FindCategoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            Data: []
        }
    }

    componentDidMount() {
        const sefl = this;
        const name = this.props.match.params.name;
        $.ajax({
            url: `/writting/category/${name}`,
            type: 'post',
            success: (data) => {
                if(data.length > 0){
                    sefl.setState({Data: data});
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

export default FindCategoryPage