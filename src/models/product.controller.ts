import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from ".//user.model";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);

export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"],
    name: string,
    description: string,
    price: number,
    image: string,
    createdAt: Date,
    updatedAt: Date
};

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `P_${nanoid()}`
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
