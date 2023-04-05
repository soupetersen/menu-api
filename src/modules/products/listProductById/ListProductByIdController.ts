import { Request, Response } from "express";
import { ListProductByIdService } from "./ListProductByIdService";

export class ListProductByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listProductByIdService = new ListProductByIdService();

    const product = await listProductByIdService.execute(id);

    return response.status(200).json(product);
  }
}