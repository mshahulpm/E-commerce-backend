import joi from 'joi';
import { RouteSchema } from 'src/types/common';
import { isCuid } from 'cuid'


export const AssetRouteSchema: RouteSchema = {
    'all-assets': joi.object({
        orderBy: joi.string().valid('asc', 'desc'),
        limit: joi.number().integer().min(1).max(100),
        page: joi.number().integer().min(0),
        type: joi.string().valid('product', 'category_thumb', 'category_banner', 'home_banner')
    }),
    'delete-all-assets': joi.object({
        type: joi.string().valid('product', 'category_thumb', 'category_banner', 'home_banner').required(),
        assetIdes: joi.array().items(
            joi.string().custom((id: string) => {
                if (!isCuid(id)) {
                    throw new Error('Invalid id')
                }
                return id
            })
        ).required().max(50)
    }),
}


