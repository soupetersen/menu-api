import { Router } from "express";
import { authenticateRoute } from "./authenticate.routes";
import { categoryRoute } from "./category.routes";
import { productsRoute } from "./products.routes";

export const router = Router();

router.use("/auth", authenticateRoute);
router.use("/category", categoryRoute);
router.use("/product", productsRoute);