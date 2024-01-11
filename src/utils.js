import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;

import { hashSync, genSaltSync, compareSync } from "bcrypt";

import bcryptjs from 'bcryptjs'

//register
export const createHash = (password) =>  bcryptjs.hashSync(password, genSaltSync(10));

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
  };
    

//login

/**
 * 
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns password encriptada/hasheada
 * @returns boolean
 */
export const isValidPassword = (user, password ) => bcryptjs.compareSync(password, user.password);
