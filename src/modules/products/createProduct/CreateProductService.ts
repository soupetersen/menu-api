import { AppError } from "../../../errors/AppError";
import { Category } from "../../../models/Category";
import { Product } from "../../../models/Product";

interface IRequest {
  name: string;
  price: number;
  qty: number;
  categories: string[];
}

export class CreateProductService {

  async execute({ name, price, qty, categories }: IRequest): Promise<any> {
    const productExists = await Product.exists({ name });

    if (productExists) {
      throw new AppError('There is already one product with this name');
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

    const product = await Product.create({
      name,
      price,
      qty,
      categories: categoriesIds,
    });

    return product;
  }
}