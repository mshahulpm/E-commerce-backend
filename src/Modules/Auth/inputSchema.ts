import Joi from "joi";
import { RouteSchema } from "src/types/common";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})

export const authRouteSchema: RouteSchema = {
    'login': loginSchema,
    'signup': loginSchema,
    'verify-otp': Joi.object({
        otp: Joi.string().required().length(5)
    }),
}