import { Schema, Document } from 'mongoose'

export const modelName = 'Order'

export enum STATUS {
  PENDING = 'PENDING',
  SERVED = 'SERVED',
}

export const OrderSchema = new Schema({
  customerId: { type: String, required: true },
  // order's product should be a snapshot.
  // If the product are updated or deleted,
  // the product when the order is made is still preserved.
  product: { type: Schema.Types.Mixed, required: true },
  status: {
    type: String,
    enum: [STATUS.PENDING, STATUS.SERVED],
    required: true,
  },
})

export interface IOrder extends Document {
  customerId: string
  product: object
  status: STATUS
}
