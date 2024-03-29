import ProductMongoDao from './mongodb/product.dao.js'
import UserDao from "./mongodb/user.dao.js";
import { initMongoDB } from './mongodb/connection.js';
/* ------------------------------------ - ----------------------------------- */
import ProductManager from "./filesystem/product.dao.js";
import UserDaoFS from "./filesystem/user.dao.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMySql from './mysql/product.dao.js';
import UserDaoMySql from './mysql/user.dao.js';
import { initMySqlDB } from './mysql/connection.js';

let userDao;
let prodDao;
let persistence = process.argv[2];
// let persistence = process.env.PERSISTENCE;

switch (persistence) {
    case 'file':
        userDao = new UserDaoFS();
        prodDao = new ProductManager();
        console.log(persistence);
        break;
    case 'mongo':
        await initMongoDB();
        userDao = new UserDao();
        prodDao = new ProductMongoDao();
        console.log(persistence);
        break;
    case 'mysql':
        await initMySqlDB();
        userDao = new UserDaoMySql();
        prodDao = new ProductDaoMySql();
        console.log(persistence);
        break;
    default:  
        userDao = new UserDaoFS();
        prodDao = new ProductManager();
        persistence = 'file'
        console.log(persistence);
        break; 
};

export default { prodDao, userDao };