import { Request, Response } from "express";
import { ListCategoriesService } from "./ListCategoriesService";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = new ListCategoriesService();

    const categories = await listCategoriesService.execute();

    return response.status(200).json(categories);
  }
}