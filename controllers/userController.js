import { updateCheckIn } from "../repositories/userRepository.js";
import { processCheckOut } from "../services/userService.js";
import AppError from "../utils/AppError.js"


//checkIn

export  const checkIn = async(req,res,next) => {

    const par_code = req.body.par_code ;

    try{

    const user = await updateCheckIn(par_code) ;

        if(!user) {
            throw new AppError("par_code not found",404)
        }

        res.status(200).json(user);

    }
    catch(err) {
        next(err);
    }

} 

//checkOut

export const checkOut = async(req,res,next) => {

    const par_code = req.body.par_code;

    try {

        const result = await processCheckOut(par_code) ;

        if (result.emailSent === false) {
            return res.status(200).json({...result,warning: "Check-out saved but manager email failed"});
        }

        res.status(200).json(result)

    
    }
    catch(err) {
        next(err);
    }
}



    



