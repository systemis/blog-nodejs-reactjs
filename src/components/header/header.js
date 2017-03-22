import React, { Component } from 'react';

require('./header-style.css');

class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span> 
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="/" target="_bank">Home</a></li>
                                <li><a href="http://systemiscv.herokuapp.com/">About me</a></li> 
                                <li><a href="http://systemiscv.herokuapp.com/">Contact me</a></li> 
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="https://www.facebook.com/profile.php?id=100009763863563"><i className="fa fa-facebook" /></a></li>
                                <li><a href="https://twitter.com/numberjonhpham"><i className="fa fa-twitter" /></a></li>
                                <li><a href="https://plus.google.com/u/0/108877427984476073932"><i className="fa fa-google-plus" /></a></li>
                                <li><a href="https://github.com/systemis"><i className="fa fa-github" /></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="header-title-writing-back row">  
                    <div className="col-md-11 col-sm-11 col-xs-11">
                        <a href="/" target="_bank">
                            <p style={{float: "left"}}>
                                <span>Writing</span> 
                                <span className="dot red"> . </span>
                            </p>
                        </a>
                    </div>
                    <i className="fa fa-bars col-md-1 col-sm-1 col-xs-1" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default Header;