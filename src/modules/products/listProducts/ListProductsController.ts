import { Request, Response } from "express";
import { ListProductsService } from "./ListProductsService";

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute();

    return response.status(200).json(products);
  }
}