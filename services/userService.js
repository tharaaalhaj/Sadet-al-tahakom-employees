import { findByParCode } from "../repositories/userRepository.js";
import { updateCheckOut , updateStatus } from "../repositories/userRepository.js";
import { sendEmailToManager } from "../emailService.js";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

//checkOut

export  const processCheckOut = async (par_code) => {

    const user = await findByParCode(par_code);

       if (!user) throw new AppError("par_code not found", 404);

       if (!user.check_in_time) throw new AppError("CheckIn not found", 400);


    const updatedUser = await updateCheckOut(par_code);

    //diff

        const diff = new Date(updatedUser.check_out_time) - new Date(updatedUser.check_in_time);
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);

    //time

    const time  = `hours : ${hours} and minutes : ${minutes}`;

       let finalUser ;
       let emailSent;

    if(hours >= 6) {
        finalUser = await updateStatus(par_code, "signup");
    }

    else {

        finalUser = await updateStatus(par_code, "not complete");

           emailSent = true ;

        try {
            
            await sendEmailToManager(
                    `تنبيه: ${user.name} لم يكمل 6 ساعات`,
                    `اسم الموظف: ${user.name}\nوقت الدخول: ${updatedUser.check_in_time}\nوقت الخروج: ${updatedUser.check_out_time}\nعدد الساعات: ${time}`
            );
        }
        catch(err) {

            emailSent = false;
               logger.warn("Manager email failed", { message: err.message, par_code });
            
        }

    }

    return { user: finalUser, hours, minutes, emailSent };
  
}