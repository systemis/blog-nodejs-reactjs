const connection = require('../config/database-config.js');
const tableName  = `admininfo`;
class adminDM{
    constructor(){
        connection.query("CREATE TABLE IF NOT EXISTS `admininfo` ( `username` VARCHAR(200) NOT NULL , `password` TEXT NOT NULL , PRIMARY KEY (`username`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci", (err, result) => {
            console.log(err);
            console.log(`create table admin info is: ${result}`);
        })
    }

    getAdminInfo(fn){
        connection.query(`SELECT * FROM ${tableName}`, (err, result) => {
            fn(err, result[0]);
        })
    }
}

module.exports = new adminDM();