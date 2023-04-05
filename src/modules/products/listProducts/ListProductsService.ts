import { Product } from "../../../models/Product";

export class ListProductsService {
  async execute() {
    const products = await Product.find().populate("category");
    return products;
  }
}