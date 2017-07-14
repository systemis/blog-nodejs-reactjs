import React, { Component } from 'react';
import $                    from 'jquery';
import './footer-style.css';

const avatar = require('./accest/avatar-me.jpg');
const GL1    = require('./accest/1.jpg');
const GL2    = require('./accest/2.jpg');
const GL3    = require('./accest/3.jpg');
const GL4    = require('./accest/4.jpg');
const GL5    = require('./accest/5.jpg');
const GL6    = require('./accest/6.jpg');
const GL7    = require('./accest/7.jpg');
const GL8    = require('./accest/8.jpg');
const GL9    = require('./accest/9.jpg');


const QuotationsItem = (props) => (
    <div className="about-me-show-puotations-quotation-item">
        <p>
            <span> { props.man} : </span>
            { props.value }
        </p>
    </div>
)

const GalleryItem = (props) => (
    <div className="about-me-show-gallerys-gallery-item col-md-4 col-sm-4 col-xs-4">
        <div className="child">
            <img src={props.image} alt="Gallery image"/>
        </div>
    </div>
)

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            GalleryImages: [ GL1,GL2,GL3,GL4,GL5,GL6,GL7,GL8,GL9 ]
        }
    }
    render() {
        return (
            <div className="footer">
                <h1> Footer </h1>
                <div className="show-info-about-me row">
                    <div className="about-me-show-info col-md-4 col-sm-4">
                        <h4> About me </h4>
                        <a id="show-avatar-me" href="http://systemiscv.herokuapp.com/">
                            <img src={avatar} alt="Image about me" />
                        </a>
                        <p className="footer-about-me-show-info-me-text">
                             Mình là Thinh - nickname là: <strong> Systemis </strong>. Mình 15 tuổi, hiện đang là học sinh tại Đà Nẵng. Thịnh đã từng làm freelancer Android và bây giờ là fullstack web (tức là gánh luôn cả font-end và back-end). Thịnh vẫn FA nên ai muốn làm quen cứ thoải mái ib <a href="https://www.facebook.com/profile.php?id=100009763863563"> facebook </a> . 
                        </p>
                    </div>
                    <div className="about-me-show-quotations col-md-4 col-sm-4">
                        <h4> Quotations </h4>
                        <QuotationsItem man="Bill gates"       value="Cuộc đời vốn dĩ bắt công nên hay sống quen với nó ." />
                        <QuotationsItem man="Steven Jobs"      value="Thời gian là hữu hạn, thế đừng lãng phí nó để sống cuộc đời của người khác ." />
                        <QuotationsItem man="Charlie chaplin"  value="Một ngày không có tiếng cười là một ngày lãng phí ." />
                        <QuotationsItem man="Systemis"         value="Thành công là hạnh phúc, nên những gì làm bạn cười là bạn đang có thành công rồi, ok ." />
                    </div>
                    <div className="about-me-show-gallerys row col-md-4 col-sm-4">
                        <h4> My gallery </h4>
                        { this.state.GalleryImages.map((value, index) => {
                            return <GalleryItem key={index} image={value} />
                        })}
                    </div>
                </div>
                <hr/>
                <div className="last-footer">
                    © 2017 Systemis blog, design and progamming by Systemis 
                </div>
            </div>
        );
    }
}

export default Footer;