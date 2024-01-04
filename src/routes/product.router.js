import { Router } from "express";
import {getAll, getById, create, update, remove, sortAggregation, getQuery, addProductToCart}from "../controllers/product.controllers.js";
const router = Router();
import socketServer from "../app.js";
import  ProductManager  from "../daos/filesystem/product.dao.js";
import { ProductModel } from "../daos/mongodb/models/product.model.js";
const productManager = new ProductManager("../product.json");


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

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);




export default router;