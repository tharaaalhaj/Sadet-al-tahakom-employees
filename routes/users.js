import express from "express" ;
import { checkIn ,checkOut} from "../controllers/userController.js";
import validate from "../Middleware/validate.js";
import { parCodeSchema } from "../schemas/userSchemas.js";

const router = express.Router();


router.patch("/checkIn" ,validate(parCodeSchema), checkIn );


router.patch("/signup", validate(parCodeSchema) ,checkOut);



export default router;