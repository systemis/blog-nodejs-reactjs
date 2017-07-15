import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Chip from 'material-ui/Chip';
require('./new-blog-style.css');

class NewPostPage extends Component {
    constructor(props){
        super(props);
       
        const self  = this;
        this.postId = this.props.match.params.id;
        this.state  = { category: [],  category_data: [], okRe: false}
        this.styles = {
            chip: {
                margin: 4,
                display: "inline-block"
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    componentWillMount() {
        const self = this;
        $.ajax({
            url: '/get-all-categorys',
            type: "POST",
            success: (data) => {
                console.log(data);
                if(data.length > 0){
                    self.setState({ category_data: data});
                }
            }
        })    
    }

    handlingSubmit(choice){
        const self  = this;
        $(document).ready(() => {
            if(choice === '/writting/create-new'){
            }else if (choice.indexOf("/writting/edit/") !== -1){
                $.ajax({
                    url: `/getpost/id/${self.postId}`,
                    type: "POST",
                    success: (data) => {
                        //self.setState({ Data: data});
                        $("#title-create-new-page")     .empty();
                        $("#form-input #btn-add-upadte").empty();
                        $("#form-input #btn-add-upadte").append("Update");
                        $("#title-create-new-page")     .append("Edit post " + data.id);
                        $("#form-input #title")         .val(data.title);
                        $("#form-input #value")         .val(data.value);
                        $("#form-input #category")      .val(data.category);
                        $("#form-input #tag")           .val(data.tag);
                        $("#form-input").append($.parseHTML("<input type='hidden' name='d_image' value='"+data.image+"' />"))
                        console.log('adding');
                        // Dùng để chuyển đổi chuỗi thư mục thành mạng chứa các thư mục để gán cho state .
                        if(data.category){
                            self.setState({category: JSON.parse(data.category)});
                        }
                    }
                })
            }
        })
    }

    // Handling when systemis remove category for blog 
    handleRequestDelete = (key) => {
        if(this.state.category.indexOf(key) != -1){
            var newValue = this.state.category;
            
            newValue.splice(newValue.indexOf(key), 1);
            
            if(newValue.length < 2) newValue.splice();
            
            this.setState({category: newValue})
        }
    };

    // Hanling when systemis add category for blog 
    handlingAddCategoryAndCreate(){
        var self = this;
        $(document).ready(function(){
            $("#choosecategory").change(function(){
                var value = $(this).val();
                if(self.state.category.indexOf(value) == -1){
                    var newValue = self.state.category;
                    
                    newValue.push(value);
                    
                    self.setState({category: newValue});
                }
            })
        });
    }

    // Create blog 
    createNewBlog(){
        $(document).ready(function(){
            $("#form-input").submit(function(){
                var name     = $("#form-input #title").val();
                var value    = $("#form-input #value").val();
                var category = $("#form-input #category").val();
                if(name === '' || value === '' || category === ''){
                    return false;
                }else{
                    return true;
                }
            })
        })
    }
    mainLayout(){
        if(!this.state.okRe) return ;
        return (
             <div className="create-new-blog-post-page">
                <h1 id="title-create-new-page"> Create new Blog </h1>
                <div className="create-new-group">
                    
                    <form id="form-input" action="" method="post" encType="multipart/form-data" >
                        <div className="create-item create-title">
                            <h5 className="title-group"> Name of new blog: </h5>
                            <input type="text" name="title" id="title" maxLength="60" />
                        </div>
                    
                        <div className="create-item create-content">
                            <h5 className="title-group"> Content: </h5>
                            <textarea id="value" name="value" rows="10"></textarea>
                        </div>
                    
                        <div className="create-item input-categorys">
                            <h5 className="title-group">
                                Categorys:
                            </h5>
                            <select id="choosecategory" >
                                {this.state.category_data.map((value, index) => {
                                    return(
                                        <option key={ index } value={ value.name }> { value.name } </option>
                                    )
                                })}
                            </select>
                            { 
                                this.state.category.map((value, index) => {
                                    return( 
                                        <span>
                                            <Chip 
                                                key={index} 
                                                style={this.styles.chip}
                                            > 
                                                {value} 
                                            </Chip>
                                            <span onClick={() => this.handleRequestDelete(value)}>
                                                xoa
                                            </span>
                                        </span>
                                )})
                            }
                            <input type="hidden" name="category" value={JSON.stringify(this.state.category)}/>
                        </div>

                        <div className="create-item input-tag">
                            <h5 className="title-group">
                                Tag:
                            </h5>
                            <input type="text" name="tag" id="tag" maxLength="50"/>
                        </div>

                        <div className="create-item input-image">
                            <h5 className="title-group">
                                Image:
                            </h5>
                            <input type="file" name="image" id="image"/>
                        </div>
                        
                        <div className="create-item cp-btn">
                            <button type="submit" id="btn-add-upadte" className="btn btn-success">
                                Create new 
                            </button>
                        </div>
                        { this.createNewBlog() }
                    </form>

                    <div className="create-item cp-btn">
                        <a href="/" className="btn btn-primary"> Back to home </a>
                    </div>
                </div>
            </div>
        )
    }
    handlingLoginAdmin(){
        var self = this;
        $(document).ready(() => {
            $("#input-user-value #login-admin ").click(() => {
                var userName = $("#input-user-value #username").val();
                var passWord = $("#input-user-value #password").val();
                $.ajax({
                    url: '/login-admin-edit',   
                    type: 'post',
                    data: {username: userName, password: passWord},
                    success: (data) => {
                        if(!data) return alert('That bai');
                        
                        self.setState({okRe: true});
                        self.handlingSubmit(self.props.location.pathname);
                        $("#input-user-value").hide();
                    }
                })
            })
        })
        // if(this.state.okRe) { return(self.mainLayout()) }
    }
    render() {
        this.handlingAddCategoryAndCreate() 
        return (
            <div>
                <div id="input-user-value">
                        <h3> Login to admin </h3>
                        <input id="username" type="text"     placeholder="Input admin username ."/>
                        <br/>
                        <input id="password" type="password" placeholder="Input admin password ."/>
                        <br/>
                        <input id="login-admin" className="btn btn-primary" type="submit" value="Login to edit "/>
                </div>
                {this.mainLayout()}
            </div>
        );
    }

    componentDidMount() {
        this.handlingLoginAdmin();
    }
}

export default NewPostPage;
