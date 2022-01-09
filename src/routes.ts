import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { 
    createSessionHandler, 
    deleteSessionHandler, 
    getUserSessionsHandler 
} from "./controllers/session.controller";
import {
    createProductHandler,
    updateProductHandler,
    getProductHandler,
    deleteProductHandler
} from "./controllers/product.controller";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";
import {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getProductSchema
} from "./schemas/product.schema";
import validateResource from "./middlewares/validateResource";
import isAuthenticated from "./middlewares/isAuthenticated";

const routes = (app: Express) => {
    app.get("/health-check", (req: Request, res: Response) => {
        res.json({'status': 'Healthy'})
        res.sendStatus(200);
    });

    // Account Routes
    app.post(
        "/api/users", 
        validateResource(createUserSchema), 
        createUserHandler
    );
    app.post(
        "/api/sessions", 
        validateResource(createSessionSchema), 
        createSessionHandler
    );
    app.get(
        "/api/sessions", 
        isAuthenticated, 
        getUserSessionsHandler
    );
    app.delete(
        "/api/sessions", 
        isAuthenticated, 
        deleteSessionHandler
    );

    // Product routes
    app.post(
        "/api/products", 
        isAuthenticated, 
        validateResource(createProductSchema), 
        createProductHandler
    );
    app.put(
        "/api/products/:productId", 
        [isAuthenticated, validateResource(updateProductSchema)], 
        updateProductHandler
    );
    app.get(
        "/api/products/:productId", 
        validateResource(getProductSchema), 
        getProductHandler
    );
    app.delete(
        "/api/products/:productId", 
        [isAuthenticated, validateResource(deleteProductSchema)], 
        deleteProductHandler
    );
};

export default routes;