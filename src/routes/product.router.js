import { Router } from "express";
import {getAll, getById, create, update, remove, sortAggregation, getQuery, addProductToCart}from "../controllers/product.controllers.js";
const router = Router();
import UserController from "../controllers/user.controller.js";
import socketServer from "../app.js";
import  ProductManager  from "../daos/filesystem/product.dao.js";
import { ProductModel } from "../daos/mongodb/models/product.model.js";
const productManager = new ProductManager("../product.json");
const { isAdmin, isUser } = '../middlewares/currentAuth.js';
import * as controller from "../controllers/product.controllers.js";

router.post('/add/:idCart/:idProduct', addProductToCart)

router.get('/sortAggregation', sortAggregation);

router.get('/pruebaPaginate', async(req, res)=>{
    const options = {
        page:1,
        limit:2
    }
    const products = await ProductModel.paginate({},options)
    res.json(products)
});

router.get('/getQuery', getQuery)

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create,isAdmin, isUser);

router.put("/:id", controller.update, isAdmin, isUser);

router.delete("/:id", controller.remove, isAdmin, isUser);

router.get("/mockingproducts", UserController.getMockingProducts);


export default router;