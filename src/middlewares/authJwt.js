import jwt from "jsonwebtoken";
const {verify} =pkg;
import userDao from "../daos/mongodb/user.dao.js"
import 'dotenv/config';

export const PRIVATE_KEY = "1234";
const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const generateToken = (user) => {
  const payload = {
    userId: user._id
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "20m",
  });
  return token;

  const checkAuth = async (req, res, next) => {
    try {
      const authHeader = req.get("Authorization");
      if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
      const token = authHeader.split(" ")[1];
      const decode = verify(token, SECRET_KEY);
      console.log("TOKEN DECODIFICADO");
      console.log(decode);
      const user = await userDao.getById(decode.userId);
      if (!user) return res.status(400).json({ msg: "Unauthorized" });
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ msg: "Unauthorized" });
    }
  }
};