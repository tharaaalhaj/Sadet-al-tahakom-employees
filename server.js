import "dotenv/config";
import app from "./app.js";
import connectionDB from "./config/connectionDB.js";
import logger from "./utils/logger.js";

const port = 3000;

connectionDB();

app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
});