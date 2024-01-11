
import { connect } from "mongoose";
import 'dotenv/config';

 //const MONGO_URL = 'mongodb://127.0.0.1:27017/ecommerce';
export const connectionString = process.env.MONGO_URL || 'mongodb+srv://lucasgragera51:2l0i0g1e@ecommercee.xfj5uxp.mongodb.net/';
//NO SE POR QUE SI NO AGREGO || NO FUNCIONA, ME TIRA UN ERROR 
    try {
        await connect(connectionString)
        console.log("Conectado a la base de datos de MongoDB");
    } catch (error) {
        console.log(error);
    }