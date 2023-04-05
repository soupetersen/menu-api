import { Product } from "../../../models/Product";

export class ListProductsService {
  async execute() {
    const products = await Product.find().populate([{
      path: 'categories',
      select: 'name',
    }]);
    return products;
  }
}