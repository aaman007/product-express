import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get<number>("port");
const baseUrl = config.get<string>("baseUrl");

const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`App has started at ${baseUrl}:${port}`);
    await connect();

    routes(app);
});