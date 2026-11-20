import { z } from "zod";

export const parCodeSchema = z.object({
    par_code : z.string().trim().min(1,"par_code is required").max(255, "par_code is too long")
})