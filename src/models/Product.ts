import { Schema, model } from "mongoose";
import { Category, CategorySchema, ICategory } from "./Category";

export interface IProduct {
  name: string;
  price: number;
  qty: number;
  categories: ICategory[];
}

const ProductSchema = new Schema({
  name: { type: "string", required: true },
  price: { type: "number", required: true },
  qty: { type: "number", required: true },
  categories: [
    { 
      type: Schema.Types.ObjectId, 
      ref: "Category",
    }
  ],
},
  { 
    versionKey: false,
  },
);

export const Product = model("product", ProductSchema);