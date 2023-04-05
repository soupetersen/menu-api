import { Request, Response } from "express";
import { UpdateProductService } from "./UpdateProductService";
import * as z from "zod";
import { AppError } from "../../../errors/AppError";

const schemaQuery = z.object({
	id: z.string(),
});

const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  qty: z.number().optional(),
  categories: z.array(z.string()).optional(),
});

export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = schemaQuery.parse(request.params);

    if (!id) {
      throw new AppError("Id is required");
    }

    const { name, price, qty, categories } = updateProductSchema.parse(request.body);

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id,
      name,
      price,
      qty,
      categories,
    });

    return response.json(product);
  }
}