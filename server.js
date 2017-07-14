'use strict';
var express = require('express');
var app     = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// var router = require('./server/main.js');

// app.use(router);

require('./server/model/database-post.js');

app.listen(process.env.PORT || 3000, () => {
    console.log('co nguoi dang truy cap web bang cong 3000');
})