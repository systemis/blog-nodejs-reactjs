const connection = require('../config/database-config.js');
const tableName  = `categorysmanager`;
class categoryDM{
    constructor(){
        connection.query("CREATE TABLE IF NOT EXISTS `categorysmanager` ( `name` TEXT NOT NULL ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci", (err, result) => {
            console.log(`Create table ${tableName} error: ${err}`);
            console.log(`Create table ${tableName} is: ${result}`);
        });
    }

    newCategory(name){
        connection.query(`INSERT INTO ${tableName} SET name = ?`, [name], (err, result) => {
            console.log(`Error when add category with name: ${name} is: ${err}`);
            console.log(`Add category with name: ${name} is: ${JSON.stringify(result)}`);
        })
    }
}

module.exports = new categoryDM();