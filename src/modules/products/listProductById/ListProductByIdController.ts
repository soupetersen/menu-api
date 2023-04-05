import { Request, Response } from "express";
import { ListProductByIdService } from "./ListProductByIdService";
import { AppError } from "../../../errors/AppError";
import * as z from "zod";

const schemaQuery = z.object({
	id: z.string(),
});

export class ListProductByIdController {
  async handle(request: Request, response: Response) {
    const { id } = schemaQuery.parse(request.params);
    
    if (!id) {
      throw new AppError("Id is required");
    }

    const listProductByIdService = new ListProductByIdService();

    const product = await listProductByIdService.execute(id);

    return response.status(200).json(product);
  }
}