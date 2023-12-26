import { response } from "express";
import UserServices from "../servicies/user.services.js";
const userService = new UserServices();
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: "register ok",
      session: req.session,
    });
  } catch (error) {
    next(error.message);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    const id = req.session.passport.user;
    const user = await userDao.getById(id);
    const { first_name, last_name } = user;
    res.json({
      msg: "login ok",
      user: { first_name, last_name },
    });
  } catch (error) {
    next(error.message);
  }
};
export const githubResponse = async (req, res, next) => {
  try {
    console.log(req.user);
    const { first_name, email, isGithub } = req.user;
    res.json({
      msg: "Register/Login Github ok",
      session: req.session,
      user: {
        first_name,
        email,
        isGithub
      }
    });
  } catch (error) {
    next(error.message);
  }
};

export default class UserController {
  async register(req, res, next) {
    console.log(req.body);
    try {
      const user = await userService.register(req.body);
      if (user) res.redirect("/views");
      else res.redirect("/views/register-error");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      console.log(user);
      if (user) {
        req.session.email = email;
        req.session.password = password;
        res.redirect("/views/profile");
      } else res.redirect("/views/error-login");
    } catch (error) {
      next(error);
    }
  }
}

// const users = [
//   {
//     username:"juan",
//     password:"1234",
//     admin: true,
//   },
//   {
//     username:"jose",
//     password:"123456",
//     admin: false,
//   }
// ];

export const login = (req, res) => {
    const { username, password } = req.body;
    const index = users.findIndex(
      (aUser) => aUser.username === username && aUser.password === password
    );
    console.log(index);
    if (index < 0) res.status(401).json({ msg: "no estas autorizado" });
    else {
      const user = users[index];
      req.session.info = {
        loggedIn: true,
        count: 1,
        username: user.username,
        admin: user.admin,
      };
      res.json({ msg: "Bienvenido!!" });
    }
  };
  
  export const visit = (req, res) => {
    req.session.info.count++;
    res.json({
      msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.count} veces`,
    });
  };
  
  export const logout = (req, res) => {
    req.session.destroy((err) => {
      if (!err) res.send("Logout ok!");
      else res.send({ status: "Logout ERROR", body: err });
    });
  };
  
  export const infoSession = (req, res) => {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
  };