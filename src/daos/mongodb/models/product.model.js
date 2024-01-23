import { Schema, model } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

// const collectionName = "products";

export const productsSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  disponibilidad: { type: Number, required: true },
});

const collectionSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  }
});

collectionSchema.plugin(mongoosePaginate);

// export const ProductModel = model(collectionName, collectionSchema);
//export const ProductModel = model("products", collectionSchema);
export const ProductModel = model("products", productsSchema);