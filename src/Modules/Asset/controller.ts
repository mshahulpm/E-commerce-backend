import cuid from "cuid";
import { NextFunction, Request, Response } from "express";
import path from "path";
import sharp from "sharp";




export async function uploadImage(req: Request, res: Response, next: NextFunction) {
    /** 
     * Products images upload
     * */
    const files = req.files as Express.Multer.File[]
    const outDir = path.resolve(__dirname, '../../../../public/images')
    let fileNames: string[] = []
    try {
        await Promise.allSettled(files.map(async (file) => {
            const fileName = cuid()
            await Promise.allSettled([
                // 700 x 700
                sharp(file.buffer)
                    .resize(700, 700, { fit: 'inside', })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_700.png')),
                // 400 x 400
                sharp(file.buffer)
                    .resize(400, 400, { fit: 'inside', })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_400.png')),
                // 100 x 100
                sharp(file.buffer)
                    .resize(100, 100, { fit: 'inside', })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName + '_100.png')),
            ])
            fileNames.push(fileName)
            return fileName
        }
        ))
        return res.json({
            images: fileNames.map(image => ({
                image_large: image + '.png',
                thumbnail: image + '_100.png',
                image: image + '_400.png',
            }))
        })
    } catch (error) {
        next(error)
    }
}