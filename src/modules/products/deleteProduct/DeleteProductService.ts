import { Product } from "../../../models/Product";

export class DeleteProductService {
  async execute(id: string) {
    await Product.findByIdAndDelete(id);
  }
}