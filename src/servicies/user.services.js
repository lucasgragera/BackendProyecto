import Services from "./class.services.js";
import UserDao from "../daos/mongodb/user.dao.js";
import { UserModel } from "../daos/mongodb/models/user.model.js";
import { createHash, isValidPassword } from '../utils/utils.js';
import jwt from "jsonwebtoken";
const userDao = new UserDao();

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

// export default class UserServices {
//   constructor() {
//     super(userDao);
//   async findByEmail(email) {
//     return await UserModel.findOne({ email });
//   }
// }
export const getByIdUser = async (id) => {
  try {
    const user = await userDao.getById(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmailUser = async (email) => {
  try {
    const user = await userDao.getByEmail(email);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};
export default class UserService extends Services {
    constructor() {
      super(userDao);
    }
    #generateToken(user) {
      const payload = {
        userId: user._id,
      };
      return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
    }

  async register(user) {
    try {
      const { email, password } = user;
      if (email === 'adminCoder@coder.com' && password === 'adminCoder123') {
        return await UserModel.create({ ...user, password: createHash(password), role: 'admin' });
      }
      const exists = await this.findByEmail(email);
      console.log(exists);
      if (!exists) return await UserModel.create(
        {
          ...user,
          password: createHash(password)
        }
      );
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const isValid = isValidPassword(password, userExist);
        console.log('isValid__', isValid);
        if (!isValid) return false;
        else return this.#generateToken(userExist);
        // !isValid ? false : userExist
      } return false;
    } catch (error) {
      console.log(error);
    }
  }
}