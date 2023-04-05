import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListProductsController } from "../modules/products/listProducts/ListProductsController";
import { ListProductByIdController } from "../modules/products/listProductById/ListProductByIdController";

export const productsRoute = Router();

const listProductsController = new ListProductsController();
const listProductByIdController = new ListProductByIdController();

productsRoute.get("/", ensureAuthenticated, listProductsController.handle);
productsRoute.get("/:id", ensureAuthenticated, listProductByIdController.handle);