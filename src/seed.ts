import { connect } from "mongoose";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { categories } from "./utils/categories";
import { products } from "./utils/products";
import env from "dotenv";
import path from "path";

const reqPath = path.join(__dirname, '..');
env.config({
  path: `${reqPath}/.env.local`
});


(async () => {
  await connect(process.env.DATABASE_URL ?? "").then(() => {
    console.log("Connected to database for seed");
  });

  await seedCategories();
  await seedProducts();

  console.log("Seed finished");
})();

async function seedCategories() {
  categories.forEach(async ({ name }) => {
    const categoryExists = await Category.exists({ name });
    if (!categoryExists) {
      await Category.create({ name });
    }
  });
}

async function seedProducts() {
  products.forEach(async ({ name, price, qty, categories: productsCategories }) => {
    const productExists = await Product.exists({ name });
    if (!productExists) {
      const categoriesIds = await Promise.all(
        productsCategories.map(async ({ name }) => {
          const result = await Category.findOne({ name });
          return result?._id;
        })
      );
      const result = await Product.create({ name, price, qty, categories: categoriesIds });
    }
  });
}