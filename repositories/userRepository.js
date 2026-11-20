import {db} from "../config/connectionDB.js";


// checkIn

export const updateCheckIn =  async (par_code) => {

    const result = await db.query(`
        UPDATE users 
         SET check_in_time = NOW() ,
            status = 'entry only'
        WHERE par_code = $1
        RETURNING *
    ` ,[par_code]);

    return result.rows[0];

}

// checkOut

export const findByParCode = async (par_code) => {

    const result = await db.query("SELECT * FROM users WHERE par_code =$1" ,[par_code]);

    return result.rows[0];

}

export const updateCheckOut = async(par_code) => {

    const result =  await db.query(`
            UPDATE users 
            SET check_out_time = NOW() 
            WHERE par_code =$1 
            RETURNING *
     `,[par_code]);

    return result.rows[0];

}


export const updateStatus = async(par_code ,status) => {

    const  result = await db.query(`
                UPDATE users
                SET status = $1 
                WHERE par_code = $2
               RETURNING *
            `,[status,par_code]);
    
    return result.rows[0];

};