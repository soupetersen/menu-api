import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  parent: ICategory | null;
}

export const CategorySchema = new Schema<ICategory>({
  name : String,
  parent: {
    type: Schema.Types.ObjectId || null,
    ref: 'Category'
  }
},
  {
    versionKey: false
  }
);

export const Category = model<ICategory>('Category', CategorySchema);