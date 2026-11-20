import morgan from "morgan";
import logger from "./utils/logger.js";
import express from "express";
import userRouter from "./routes/users.js";
import errorHandler from "./Middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import openapi from "./docs/openapi.js";


const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));    

app.use(
    morgan("tiny", {
        stream: { write: (message) => logger.info(message.trim()) },
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/user" , userRouter);


app.use(errorHandler);

export default app ;

