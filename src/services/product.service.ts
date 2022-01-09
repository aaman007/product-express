import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, { ProductDocument } from "../models/product.controller";

export const createProduct = async (data: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) => {
    try { 
        const product = await Product.create(data);
        return product;
    }
    catch (err) {
        throw err;
    }
};

export const findProduct = async (
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
) => {
    try {
        const product = await Product.findOne(query, {}, options)
        return product;
    }
    catch (err) {
        throw err;
    }
};

export const findAndUpdateProduct = (
    query: FilterQuery<ProductDocument>, 
    update: UpdateQuery<ProductDocument>, 
    options: QueryOptions
) => {
    return Product.findOneAndUpdate(query, update, options);
};

export const deleteProduct = (query: FilterQuery<ProductDocument>) => {
    return Product.deleteOne(query);
};