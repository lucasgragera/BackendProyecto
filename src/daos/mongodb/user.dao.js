//import  {createHash, isValidPassword}  from  '../utils';
import { UserModel } from './models/user.model.js';
import MongoDao from './mongo.dao.js';

export default class UserDao extends MongoDao{
  constructor(){
    super(UserModel);
  }
    async registerUser(user) {
        // console.log('userDao:::', user);
        try {
          const { email, password } = user;
          const existUser = await UserModel.findOne({ email });
          if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
              return await UserModel.create({
                ...user,
                password: createHash(password),
                role: "admin",
              });
            }
            return await UserModel.create({
              ...user,
              password: createHash(password),
            });
          } else return false;
        } catch (error) {
          console.log(error);
        }
      }
    
      async loginUser(user) {
        try {
          const { email, password } = user;
          const userExist = await UserModel.findOne({ email });
          if (userExist) {
            const isValid = isValidPassword(password, userExist);
            console.log('isValid__', isValid);
            if (!isValid) return false;
            else return userExist;
            // !isValid ? false : userExist
          } return false;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }
      async createUser(user) {
        try {
          const { email, password } = user;
          const existUser = await UserModel.findOne({email});
          if(!existUser){
            if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
              return await UserModel.create({
                ...user,
                password: createHash(password),
                role: 'admin'
            });
            } 
              return await UserModel.create({
                  ...user,
                  password: createHash(password),
              });
            } else return false;
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }
        }


    async getById(id) {
        try {
            const userExist = await UserModel.findById(id)
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
          throw new Error(error)
        }
    }
   
    

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ email });
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}