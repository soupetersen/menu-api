import { Product } from "../../../models/Product";

export class ListProductByIdService {
  async execute(id: string) {
    const product = await Product.findById(id);

    return product;
  }
}