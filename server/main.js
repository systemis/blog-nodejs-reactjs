const express     = require('express');
const router      = express.Router();
const morgan      = require('morgan');
const path        = require('path');
const multer      = require('multer');
const postDM      = require('./model/database-post.js');
const adminDM     = require('./model/database-admin.js');
const categorysDm = require('./model/database-category.js');

router.use(express.static(path.resolve(__dirname, '..', 'build')));

const togettherRoute = (req, res) => res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));

router.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Custom for function to save the image was uploaded 
var fileName = '';
var storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, "public/upload"));
    },
    filename: function(req, file, cb) {
        var fileType = file.originalname.substr(file.originalname.indexOf("."));
        fileName = file.originalname+ Date.now() + fileType;
        cb(false, fileName);
        fileName = '/public/upload/' + fileName;
    }
})
var Upload = multer({storage: storage});

router.get('/public/upload/:filename', (req, res) => { console.log("Có người đang muốn lấy ảnh từ dữ liệu của bạn ."); res.sendFile(path.resolve(__dirname, "public/upload/" + req.params.filename)); })
router.get('/'                       , togettherRoute);
router.get('/writting'               , togettherRoute);
router.get('/writting/post/:id'      , togettherRoute);
router.get('/writting/category/:name', togettherRoute);
router.get('/writting/tag/:name'     , togettherRoute);
router.get('/writting/create-new'    , togettherRoute);
router.get('/writting/edit/:id'      , togettherRoute);



// Get all post to show in home page
router.post('/get-all-blog', (req, res) => {
    postDM.getAllPosts((err, result) => {
        console.log(result);
        if(err) return res.send(err);
        result.map((row) => { row.value = row.value.substr(0, 400) + " ... "; })

        return res.send(result);
    })
})


// Create new blog 
router.post('/writting/create-new', Upload.any(), (req, res) => {
    var title    = req.body.title;
    var value    = req.body.value;
    var tag      = req.body.tag;
    var category = req.body.category;
    var image    = fileName;
    var date     = new Date().toLocaleDateString();
    var repply   = 'repply';
    filename     = '';


    if(tag.split('')[tag.length - 1] === ' '){
        var sh = tag.split('');
        sh.splice(tag.length - 1, 1);
        tag = sh.join("");
    }
    
    const bundle = {
        title: title, value: value, tag: tag, category: category, image: image, date: date, repply: repply
    }

    postDM.newPost(bundle, (err, result) => {
        if(err) return res.send('that bai');
        
        return res.redirect('/');
    })
})


// Get a post by id 
router.post('/getpost/id/', (req, res) => {
    const postId = req.body.id;
    postDM.findPostById(postId, (err, result) => {
        if(err) return res.send('That bai');

        res.send(result);
    })
})


// Get three relate post with id
router.post('/get-relate-post', (req, res) => {
    postDM.getAllPosts((err, result) => {
        if(err) return res.send('Khong co du lieu');

        var realResult = [];

        var j = 0;
        for(var i = result.length - 1; i >= 0; i--){
            if(j <= 2){
                realResult.push({
                    id: result[i].id,
                    title: result[i].title,
                    image: result[i].image
                })
                j += 1;
            }
        }
        return res.send(realResult);
    })
})


// Get posts by category
router.post('/writting/category/:name', (req, res) => {
    var categoryName = req.params.name;
    postDM.findPostsByCategory(categoryName, (err, result) => {
        console.log(result);
        if(err) return res.send(`That bai`);

        result.map((row) => {
            row.value = row.value.substr(0, 400) + " ... ";
        })
        return res.send(result);
    })
});

// Get posts by tag
router.post('/writting/tag/:name', (req, res) => {
    var tag = req.params.name;
    postDM.findPostsByTag(tag, (err, result) => {
        console.log(result);

        if(err) return res.send('That bai');

        result.map((row) => {
            row.value = row.value.substr(0, 400) + " ... ";
        })
        return res.send(result);
    })
});


// Get all category to use for wrtting/create-new 
router.post('/get-all-categorys', (req, res) => {
    categorysDm.getAllCategorys((err, result) => {
        if(err) return res.send("Lay key that bai .");;

        return res.send(result);
    })
})


// Update post
router.post('/writting/edit/:id', Upload.any(), (req, res) => {
    var id       = req.params.id;
    var title    = req.body.title;
    var value    = req.body.value;
    var tag      = req.body.tag;
    var category = req.body.category;
    var image    = req.body.d_image;
    var date     = new Date().toLocaleDateString();
    var repply   = 'repply';
    if(fileName) image = fileName;
    filename     = '';

    if(tag.split('')[tag.length - 1] === ' '){
        var sh = tag.split('');
        sh.splice(tag.length - 1, 1);
        tag = sh.join("");
    }


    const bundle = {
        title: title, value: value, tag: tag, category: category, image: image, date: date, repply: repply
    }

    postDM.updatePost(id, bundle, (err, result) => {
        if(err) return res.send('that bai');

        res.redirect('/');
    })
});

router.post('/login-admin-edit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    adminDM.getAdminInfo((err, result) => {
        console.log(result);

        if(err) return res.send(false);
        if(username !== result.username && password !== result.password) return res.send(false);

        return res.send(true);
    })
})

// categorysDm.dropTable();

module.exports = router;