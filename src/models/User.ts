import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
},
  {
    versionKey: false,
  }
);

export const User = model("User", userSchema);