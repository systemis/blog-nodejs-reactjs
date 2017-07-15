const connection = require('../config/database-config.js');
const tableName  = `postmanager`;
class PostDM{
    constructor(){
        console.log('creating table');
        connection.query("CREATE TABLE IF NOT EXISTS `postmanager` ( `id` INT NOT NULL AUTO_INCREMENT, `title` TEXT NOT NULL, `value` TEXT NOT NULL, `image` TEXT NOT NULL, `repply` TEXT NOT NULL, `date` TEXT NOT NULL, `category` TEXT NOT NULL, `tag` TEXT NULL DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci", (err, result) => {
            console.log(err);
            console.log(`reate post manager table: ${result}`);
        })
    }

    findPostById(id, fn){
        connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, result) => {
            fn(err, result[0]);
        })
    }

    findPostsByCategory(category, fn){
        console.log(category);
        this.getAllPosts((err1, result1) => {
            if(err1) return fn(err1, null);
            var _result1 = [];
            for(var i = 0; i < result1.length; i++){
                if(result1[i].category.indexOf(category) >= 0){
                    _result1.push(result1[i]);
                }
            }

            return fn(null, _result1);
        })
    }

    findPostsByTag(tag, fn){
        connection.query(`SELECT * FROM ${tableName} WHERE tag = ?`, [tag], (err, result) => {
            fn(err, result);
        })
    }

    getAllPosts(fn){
        connection.query(`SELECT * FROM ${tableName}`, (err, result) => {
            fn(err, result);
        })
    }

    newPost(bundle, fn){
        connection.query(`INSERT INTO ${tableName} SET ?`, bundle, (err, result) => {
            fn(err, result);
        })
    }

    updatePost(id, bundle, fn){
        connection.query(`UPDATE ${tableName} SET title = ?, value = ?, image = ?, repply = ?, date = ?, category = ?, tag = ? WHERE id = ?`, [bundle.title, bundle.value, bundle.image, bundle.repply, bundle.date, bundle.category, bundle.tag, id], (err, result) => {
            fn(err, result);
        })
    }

    dropTable(){
        connection.query(`DROP TABLE ${tableName}`, (err, result) => {
            console.log(`Error  when delete table ${tableName}: ${err}`);
            console.log(`Result when delete table ${tableName}: ${result}`);
        })
    }
}

module.exports = new PostDM();