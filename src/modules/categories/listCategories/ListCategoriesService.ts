import { Category } from "../../../models/Category";

export class ListCategoriesService {
  async execute() {
    const categories = await Category.find();
    return categories;
  }
}