import * as ProductDaoMongo from './mongodb/mongodb.js'
import * as UserDao from '../daos/mongodb/user.dao.js'
import * as ProductManager from '../daos/filesystem/product.dao.js'
import * as UserDaoFS from '../daos/filesystem/user.dao.js'

let userDao;
let prodDao;
let persistence = process.argv[2];

switch (persistence) {
    case 'file':
        userDao = UserDaoFS
        prodDao = ProductManager
        console.log(persistence);
        break;
    case 'mongo':
        await initMongoDB();
        userDao = UserDao
        prodDao = ProductDaoMongo;
        console.log(persistence);
        break;
    default:  
        userDao = UserDaoFS;
        prodDao = ProductManager;
        persistence = 'file'
        console.log(persistence);
        break; 
};

export default { prodDao, userDao };