import { Router } from "express";
import {getAll, getById, create, update, remove, sortAggregation, getQuery, addProductToCart}from "../controllers/product.controllers.js";
const router = Router();
import UserController from "../controllers/user.controller.js";
import socketServer from "../app.js";
import  ProductManager  from "../daos/filesystem/product.dao.js";
import { ProductModel } from "../daos/mongodb/models/product.model.js";
const productManager = new ProductManager("../product.json");
import { isAdmin, isUser } from '../middlewares/currentAuth.js';
//const { isAdmin, isUser } = '../middlewares/currentAuth.js';
import * as controller from "../controllers/product.controllers.js";
import {logger} from "../daos/mongodb/product.dao.js";

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

router.post("/", isAdmin, isUser, controller.create);

router.put("/:id", isAdmin, isUser, controller.update);

router.delete("/:id", isAdmin, isUser, controller.remove);

router.get("/mockingproducts", UserController.getMockingProducts);

router.get('/loggerTest', (req, res) => {
    logger.info('Endpoint /loggerTest fue accedido');
    res.send('Respuesta del endpoint /loggerTest');
  });

export default router;