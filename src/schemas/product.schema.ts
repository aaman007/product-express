import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        description: string({
            required_error: "Description is required"
        }).min(10, "Description must be at least 10 characters"),
        price: number({
            required_error: "Price is required"
        }),
        image: string({
            required_error: "Image is required"
        })
    })
};

const params = {
    params: object({
        productId: string({
            required_error: "ProductId is required"
        })
    })
};

export const createProductSchema = object({ ...payload });
export const updateProductSchema = object({ ...payload, ...params });
export const deleteProductSchema = object({ ...params });
export const getProductSchema = object({ ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductSchema = TypeOf<typeof deleteProductSchema>;
export type GetProductSchema = TypeOf<typeof getProductSchema>;
