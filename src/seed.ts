import { connect } from "mongoose";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { categories } from "./utils/categories";
import "dotenv/config";
import { products } from "./utils/products";

console.log("Starting");


(async () => {
  await connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@petersen.faehj.mongodb.net/menu_test?retryWrites=true&w=majority`
  ).then(() => {
    console.log("Connected to database for seed");
  });

  await seedCategories();
  await seedProducts();

  console.log("Seed finished");
})();

async function seedCategories() {
  categories.forEach(async ({ name }) => {
    const categoryExists = await Category.findOne({ name });
    if (!categoryExists) {
      await Category.create({ name });
    }
  });
}

async function seedProducts() {
  products.forEach(async ({ name, price, qty, categories: productsCategories }) => {
    await Product.deleteMany();
    const productExists = await Product.findOne({ name });
    if (!productExists) {
      const categoriesIds = await Promise.all(
        productsCategories.map(async ({ name }) => {
          const result = await Category.findOne({ name });
          return result?._id;
        })
      );

      console.log("categoriesIds", categoriesIds);
      const result = await Product.create({ name, price, qty, categories: categoriesIds });
      console.log("created", result); 
    }
  });
}