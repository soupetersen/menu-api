import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListProductsController } from "../modules/products/listProducts/ListProductsController";
import { ListProductByIdController } from "../modules/products/listProductById/ListProductByIdController";
import { CreateProductController } from "../modules/products/createProduct/CreateProductController";
import { UpdateProductController } from "../modules/products/updateProduct/UpdateProductController";
import { DeleteProductController } from "../modules/products/deleteProduct/DeleteProductController";

export const productsRoute = Router();

const listProductsController = new ListProductsController();
const listProductByIdController = new ListProductByIdController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRoute.get("/", ensureAuthenticated, listProductsController.handle);
productsRoute.get("/:id", ensureAuthenticated, listProductByIdController.handle);
productsRoute.post("/", ensureAuthenticated, createProductController.handle);
productsRoute.patch("/:id", ensureAuthenticated, updateProductController.handle);
productsRoute.delete("/:id", ensureAuthenticated, deleteProductController.handle);