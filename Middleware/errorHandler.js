import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    
    logger.error(err.message, {
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
    });

    res.status(500).json({ message: "Something went wrong" });
}

export default errorHandler;