import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListCategoriesController } from "../modules/categories/listCategories/ListCategoriesController";

export const categoryRoute = Router();

const listCategoriesController = new ListCategoriesController();

categoryRoute.get("/", ensureAuthenticated, listCategoriesController.handle);
