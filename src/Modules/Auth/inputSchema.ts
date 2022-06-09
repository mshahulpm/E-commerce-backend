import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})

export const authRouteSchema: {
    [key: string]: Joi.Schema
} = {
    'login': loginSchema,
    'signup': loginSchema,
    'verify-otp': Joi.object({
        otp: Joi.string().required().length(5)
    }),
}