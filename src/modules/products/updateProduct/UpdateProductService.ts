import { AppError } from "../../../errors/AppError";
import { Category } from "../../../models/Category";
import { Product } from "../../../models/Product";
import mongoose from "mongoose";


interface IRequest {
  id: string;
  name: string | undefined;
  price: number | undefined;
  qty: number | undefined;
  categories: string[] | undefined;
}

export class UpdateProductService {
  async execute({ id, name, price, qty, categories }: IRequest) {

    const product = await Product.findById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (qty) {
      product.qty = qty;
    }

    if (categories) {
      if (!Array.isArray(categories)) {
        throw new AppError("Categories must be an array of strings");
      }

      const categoriesIds = await Promise.all(
        categories.map(async (category) => {
          const result = await Category.findOne({ name: category });
          if (!result) {
            throw new AppError("Category not found");
          }
          return result?._id;
        })
      );

      product.categories = categoriesIds;
    }

    await product.save();

    return product;
  }
}