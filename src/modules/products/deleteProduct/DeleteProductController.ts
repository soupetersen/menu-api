import { Request, Response } from "express";
import { DeleteProductService } from "./DeleteProductService";
import * as z from "zod";
import { AppError } from "../../../errors/AppError";

const schemaQuery = z.object({
	id: z.string(),
});

export class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = schemaQuery.parse(request.params);

    if (!id) {
      throw new AppError("Id is required");
    }

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(id);

    return response.status(204).send();
  }
}