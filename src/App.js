import React, { Component } from 'react';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('./style.css');

import Header           from './components/header/header.js';
import HomePage         from './pages/home/home.js';
import NewPostPage      from './pages/PostBlog/new-blog-post.js';
import FindCategoryPage from './pages/FindCategory/find-category.js';
import FindTagPage      from './pages/FindTag/find-tag.js';
import ReadPage         from './pages/ReadPost/read-post.js';
import Footer           from './components/footer/footer.js';

class App extends Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div className="app container">
                        <Header />
                        <Route exact path="/" component={HomePage} />
                        <Route path='/writting/category/:name' component={FindCategoryPage} />
                        <Route path='/writting/tag/:name'      component={FindTagPage} />
                        <Route path='/writting/create-new'     component={NewPostPage} />
                        <Route path='/writting/edit/:id'       component={NewPostPage} />
                        <Route path='/writting/post/:id'       component={ReadPage} />
                        <Footer />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}


export default App;

//export default App;