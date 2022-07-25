import { AssetType } from "@prisma/client";
import cuid from "cuid";
import { NextFunction, Request, Response } from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { createManyAsset, deleteManyAsset, getAllAsset } from "../../db.services/asset";
import { assetCount } from "../../db.services/count";




/** 
 * Products images upload
 * */

export async function productImageUpload(req: Request, res: Response, next: NextFunction) {

    const files = req.files?.productImage || [] as Express.Multer.File[]

    const outDir = path.resolve(__dirname, '../../../../public/images/product')

    let fileNames: string[] = []
    try {
        await Promise.allSettled(files.map(async (file) => {
            const fileName = cuid()
            await Promise.allSettled([
                // 700 x 700
                sharp(file.buffer)
                    .resize(700, 700, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_large.png')),
                // 400 x 400
                sharp(file.buffer)
                    .resize(300, 300, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_medium.png')),
                // 100 x 100
                sharp(file.buffer)
                    .resize(100, 100, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_thumb.png')),
            ])
            fileNames.push(fileName)
            return fileName
        }
        ))
        // save to db
        const assets = fileNames.map(fileName => ({
            assetId: fileName,
            type: 'product' as AssetType,
            urls: {
                thumb: `/images/product/${fileName}_thumb.png`,
                medium: `/images/product/${fileName}_medium.png`,
                large: `/images/product/${fileName}_large.png`,
            }
        }))
        const createdImages = await createManyAsset(assets)
        return res.json({
            message: 'Product images uploaded successfully',
            data: assets
        })
    } catch (error) {
        next(error)
    }
}

/** 
 * Categories Thumb upload
 * */

export async function categoryThumbUpload(req: Request, res: Response, next: NextFunction) {

    const files = req.files?.categoryImage || [] as Express.Multer.File[]
    const outDir = path.resolve(__dirname, '../../../../public/images/category')

    let fileNames: string[] = []
    try {
        await Promise.allSettled(files.map(async (file) => {
            const fileName = cuid()
            await sharp(file.buffer)
                .resize(100, 100, { fit: 'inside', })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_thumb.png'))
            fileNames.push(fileName)
        }))
        // save to db
        const assets = fileNames.map(fileName => ({
            assetId: fileName,
            type: 'category_thumb' as AssetType,
            urls: {
                thumb: `/images/category/${fileName}_thumb.png`,
            }
        }))
        const createdImages = await createManyAsset(assets)

        return res.json({
            message: 'Category Thumbnail uploaded successfully',
            data: createdImages
        })
    } catch (error) {
        next(error)
    }

}

/** 
 * Categories Banner upload
 * */

export async function categoryBannerUpload(req: Request, res: Response, next: NextFunction) {

    const files = req.files?.categoryBanner || [] as Express.Multer.File[]
    const outDir = path.resolve(__dirname, '../../../../public/images/category')

    let fileNames: string[] = []

    try {
        await Promise.allSettled(files.map(async (file) => {
            const fileName = cuid()
            // large
            await sharp(file.buffer)
                .resize(1920, 800, { fit: 'inside', })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_large.png'))
            // medium
            await sharp(file.buffer)
                .resize(960, 400, { fit: 'inside', })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_medium.png'))
            // mobile 
            await sharp(file.buffer)
                .resize(400, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_mobile.png'))

            fileNames.push(fileName)
        }))
        // save to db
        const assets = fileNames.map(fileName => ({
            assetId: fileName,
            type: 'category_banner' as AssetType,
            urls: {
                large: `/images/category/${fileName}_large.png`,
                medium: `/images/category/${fileName}_medium.png`,
                mobile: `/images/category/${fileName}_mobile.png`,
            }
        }))
        const createdImages = await createManyAsset(assets)
        return res.json({
            message: 'Category Banner uploaded successfully',
            data: createdImages
        })
    } catch (error) {
        next(error)
    }
}

/** 
* Home banner images upload
* */

export async function homeBannerUpload(req: Request, res: Response, next: NextFunction) {

    const files = req.files?.homeBanner || [] as Express.Multer.File[]
    const outDir = path.resolve(__dirname, '../../../../public/images/banner/home')


    let fileNames: string[] = []

    try {
        await Promise.allSettled(files.map(async (file) => {
            const fileName = cuid()
            // large
            await sharp(file.buffer)
                .resize(1920, 800, { fit: 'inside', })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_large.png'))
            // medium
            await sharp(file.buffer)
                .resize(960, 400, { fit: 'inside', })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_medium.png'))
            // mobile
            await sharp(file.buffer)
                .resize(400, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                .toFormat('png')
                .toFile(path.resolve(outDir, fileName + '_mobile.png'))

            fileNames.push(fileName)
        }))
        // save to db
        const assets = fileNames.map(fileName => ({
            assetId: fileName,
            type: 'home_banner' as AssetType,
            urls: {
                large: `/images/banner/home/${fileName}_large.png`,
                medium: `/images/banner/home/${fileName}_medium.png`,
                mobile: `/images/banner/home/${fileName}_mobile.png`,
            }
        }))

        await createManyAsset(assets)

        return res.json({
            message: 'Home Banner uploaded successfully',
            data: {
                createdAsset: assets,
                createdCount: assets.length
            }
        })
    } catch (error) {
        next(error)
    }
}



export async function getAllImages(req: Request, res: Response, next: NextFunction) {
    try {
        const page = +req.query.page! || 0
        const limit = +req.query.limit! || 0
        const type = (req.query.type || 'product') as AssetType
        const [assets, count] = await Promise.all([getAllAsset(req.query), assetCount(type)])
        return res.json({
            page,
            limit,
            lastPage: ((page + 1) * limit) >= count,
            count,
            assets
        })
    } catch (error) {
        next(error)
    }
}


export async function deleteImages(req: Request, res: Response, next: NextFunction) {

    try {
        const { type, assetIdes } = req.body
        const deletedAssets = await deleteManyAsset(assetIdes)
        const productDir = path.resolve(__dirname, '../../../../public/images/product')
        const categoryDir = path.resolve(__dirname, '../../../../public/images/category')
        const bannerDir = path.resolve(__dirname, '../../../../public/images/banner/home')
        switch (type) {
            case 'product':
                await Promise.allSettled(assetIdes.map(async (id: string) => {
                    await fs.unlinkSync(path.resolve(productDir, id + '_thumb.png'))
                    await fs.unlinkSync(path.resolve(productDir, id + '_large.png'))
                    await fs.unlinkSync(path.resolve(productDir, id + '_medium.png'))
                }))
                break;
            case 'category_thumb':
                await Promise.allSettled(assetIdes.map(async (id: string) => {
                    await fs.unlinkSync(path.resolve(categoryDir, id + '_thumb.png'))
                }))
                break
            case 'category_banner':
                await Promise.allSettled(assetIdes.map(async (id: string) => {
                    await fs.unlinkSync(path.resolve(categoryDir, id + '_large.png'))
                    await fs.unlinkSync(path.resolve(categoryDir, id + '_medium.png'))
                    await fs.unlinkSync(path.resolve(categoryDir, id + '_mobile.png'))
                }))
                break
            case 'home_banner':
                await Promise.allSettled(assetIdes.map(async (id: string) => {
                    await fs.unlinkSync(path.resolve(bannerDir, id + '_large.png'))
                    await fs.unlinkSync(path.resolve(bannerDir, id + '_medium.png'))
                    await fs.unlinkSync(path.resolve(bannerDir, id + '_mobile.png'))
                }))
                break
        }

        res.status(200).json({
            message: 'Image deleted successfully',
            data: {
                deletedIdes: assetIdes,
                deletedType: type,
                deletedCount: deletedAssets
            }
        })
    } catch (error) {
        next(error)
    }

}