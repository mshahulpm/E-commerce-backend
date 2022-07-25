import joi from 'joi';
import { RouteSchema } from 'src/types/common';
import { isCuid } from 'cuid'


export const ProductRouteSchema: RouteSchema = {
    'create': joi.object({
        name: joi.string().min(4).required(),
        sku: joi.string().min(4).required(),
        slug: joi.string().min(4).required(),
        price: joi.number().min(0),
        stock: joi.number().min(0)
    })
}