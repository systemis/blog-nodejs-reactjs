const express     = require('express');
const router      = express.Router();
const morgan      = require('morgan');
const path        = require('path');
const multer      = require('multer');
const postDM      = require('./model/database-post.js');
const adminDM     = require('./model/database-admin.js');
const categorysDm = require('./model/database-category.js');

//var pool      = require('pg');
//pool.defaults.ssl = true;

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

// pool.connect((err, client, done) => {
//     if(!err){
//          client.query("CREATE TABLE IF NOT EXISTS postmanager(id SERIAL PRIMARY KEY, title text NOT NULL, value text NOT NULL, image text, repply text NOT NULL, date text, category text NOT NULL, tag text)", (err) => {
//             if(err){
//                 console.log(err);
//             }
//         }); 
//         client.query("CREATE TABLE IF NOT EXISTS categorysmanager(name text PRIMARY KEY)", (err) => {
//             if(err){
//                 console.log(err);
//             }
//         })
//          client.query("CREATE TABLE IF NOT EXISTS admininfo(username text PRIMARY KEY, password text)", (err) => {
//             if(err){
//                 console.log(err);
//             }
//         })
//     }
// })


// pool.connect((err, client, done) => {
//     if(!err){
//         client.query("INSERT INTO categorysmanager(name) VALUES('React')", (err) => {});
//         client.query("INSERT INTO admininfo(username, password) VALUES('systemis-systemisBlog', 'systemis-blog')", (err) => {});
//     }
// })


router.get('/public/upload/:filename', (req, res) => { console.log("Có người đang muốn lấy ảnh từ dữ liệu của bạn ."); res.sendFile(path.resolve(__dirname, "public/upload/" + req.params.filename)); })
router.get('/'                       , togettherRoute);
router.get('/writting'               , togettherRoute);
router.get('/writting/post/:id'      , togettherRoute);
router.get('/writting/category/:name', togettherRoute);
router.get('/writting/tag/:name'     , togettherRoute);
router.get('/writting/create-new'    , togettherRoute);
router.get('/writting/edit/:id'      , togettherRoute);


//router.get('*'), (req, res) => res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));

// Get all post to show in home page
router.post('/get-all-blog', (req, res) => {
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM postmanager ORDER BY id ASC", (err, result) => {
    //             if(!err){
    //                 result.rows.map((row) => {
    //                     row.value = row.value.substr(0, 400) + " ... ";
    //                 })
    //                 return res.send(result.rows);
    //             }else{
    //                 res.send(err);
    //             }
    //         })
    //     }
    // })
    //res.send('Fail to get data ...');

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

    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("INSERT INTO postmanager(title, value, image, repply, date, category, tag) VALUES('"+ title +"', '"+ value +"', '"+ image +"', '"+ repply +"', '"+ date +"', '"+ category +"', '"+ tag +"')", (err) => {
    //             if(err){
    //                 return res.send('That bai');
    //             }
    //         })
    //     }else{
    //         return res.send('That bai');
    //     }
    // })

    postDM.newPost(bundle, (err, result) => {
        if(err) return res.send('that bai');
        
        return res.redirect('/');
    })
})


// Get a post by id 
router.post('/getpost/id/', (req, res) => {
    const postId = req.body.id;
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM postmanager WHERE id='"+ postId +"'", (err, result) => {
    //             if(!err){
    //                 return res.send(result.rows[0]);
    //             }
    //         })
    //     }else{
    //         res.send('That bai');
    //     }
    // })

    postDM.findPostById(postId, (err, result) => {
        if(err) return res.send('That bai');

        res.send(result);
    })
})


// Get three relate post with id
router.post('/get-relate-post', (req, res) => {
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM postmanager ORDER BY id ASC", (err, result) => {
    //             if(!err){
    //                 var realResult = [];

    //                 var j = 0;
    //                 for(var i = result.rows.length - 1; i >= 0; i--){
    //                     if(j <= 2){
    //                         realResult.push({
    //                             id: result.rows[i].id,
    //                             title: result.rows[i].title,
    //                             image: result.rows[i].image
    //                         })
    //                         j += 1;
    //                     }
    //                 }
    //                 return res.send(realResult);
    //             }else{
    //             }
    //         })
    //     }
    // })

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
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM postmanager ORDER BY id ASC", (err, result) => {
    //             if(!err){
    //                 var rows = result.rows;
    //                 var realRows = [];
    //                 for(var i = 0; i < rows.length; i++){
    //                     if(rows[i].category.indexOf(categoryName) !== -1){
    //                         realRows.push(rows[i]);
    //                     }
    //                 }
    //                  realRows.map((row) => {
    //                     row.value = row.value.substr(0, 400) + " ... ";
    //                 })
    //                 return res.send(realRows);
    //             }
    //         })
    //     }else{
    //         res.send('That bai');
    //     }
    // })

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
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM postmanager WHERE tag='"+ tag +"' ORDER BY id ASC", (err, result) => {
    //             if(!err){
    //                 result.rows.map((row) => {
    //                     row.value = row.value.substr(0, 400) + " ... ";
    //                 })
    //                 return res.send(result.rows);
    //             }
    //         })
    //     }else{
    //         res.send('That bai');
    //     }
    // })

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
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query('SELECT * FROM categorysmanager', (err, result) => {
    //             if( !err ){
    //                 return res.send(result.rows);
    //             }
    //         })
    //     }else{
    //         res.send("Lay key that bai .");
    //     }
    // })

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

    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("UPDATE postmanager SET title='"+ title +"', value='"+ value +"', image='"+ image +"', repply='"+ repply +"', date='"+ date +"', category='"+ category +"', tag='"+ tag +"' WHERE id='"+ req.params.id +"'", (err) => {
    //             if(!err){
    //                 res.redirect('/');
    //             }
    //         })
    //     }
    // })

    postDM.updatePost(id, bundle, (err, result) => {
        if(err) return res.send('that bai');

        res.redirect('/');
    })
});

router.post('/login-admin-edit', (req, res) => {
    // pool.connect((err, client, done) => {
    //     if(!err){
    //         client.query("SELECT * FROM admininfo", (err, result) => {
    //             if(!err){
    //                 return res.send(result.rows[0]);
    //             }else{
    //                 res.send(err);
    //             }
    //         })
    //     }else{
    //         res.send(err);
    //     }
    // })

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