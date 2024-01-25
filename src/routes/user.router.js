import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { registerPassport, loginPassport, privateRoute, loginFront } from '../controllers/user.controller.js';

import passport from "passport";

const controller = new UserController();
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
} from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/middlewares.js";

router.post('/registerPassport', registerPassport);

router.post('/loginPassport', loginPassport);

router.get('/private', verifyToken, privateRoute);

router.post('/loginfront', loginFront);

router.post("/register", passport.authenticate('register'),controller.register, registerResponse);

router.post("/login",passport.authenticate('login'), controller.login, loginResponse);

router.get("/private", isAuth, (req, res) => res.send("route private"));

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubResponse
);
router.get("/private", verifyToken, (req, res) => {
  const { first_name, last_name, email, role } = req.user;
  res.json({
    status: "success",
    userData: {
      first_name,
      last_name,
      email,
      role,
    },
  });
});

//router.post("/login", login);

router.get("/info", validateLogIn, infoSession);

router.get("/secret-endpoint", validateLogIn, visit);

router.post("/logout", logout);

export default router;