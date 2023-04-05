import { Request, Response } from "express";
import { CreateProductService } from "./CreateProductService";
import * as z from "zod";

const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  qty: z.number(),
  categories: z.array(z.string()),
});

export class CreateProductController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, qty, categories } = createProductSchema.parse(request.body);

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      price,
      qty,
      categories
    });

    return response.status(201).json(product);
  }
}