import { request, Request, Response } from "express";
import { 
    createProduct, 
    findAndUpdateProduct, 
    findProduct, 
    deleteProduct 
} from "../services/product.service";

export const createProductHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    const product = await createProduct({ ...req.body, user: userId });

    return res.status(201).send(product);
};

export const updateProductHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if(!product) {
        return res.sendStatus(404);
    }
    else if(String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({productId}, req.body, { new: true });

    return res.status(200).send(updatedProduct);
};

export const getProductHandler = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if(!product) {
        return res.sendStatus(404);
    }

    return res.status(200).send(product);
};

export const deleteProductHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if(!product) {
        return res.sendStatus(404);
    }
    else if(String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(204);
};