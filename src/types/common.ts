import Joi from "joi";

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type UserRole = 'ADMIN' | 'USER' | 'SUB_ADMIN'

export type RouteSchema = {
    [key: string]: Joi.Schema
}