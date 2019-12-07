import { Schema, Document } from 'mongoose'

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
})

export interface IProduct extends Document {
  name: string
  image: string
  price: Number
}
