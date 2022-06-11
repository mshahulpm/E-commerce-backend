import sharp from 'sharp';
import { uploadImagesMiddleWare } from '../../config/multer';
import path from 'path'
import { NextFunction, Request, Response, Router } from "express";
import cuid from 'cuid';
import { uploadImage } from './controller';
const router = Router();


router.route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'welcome to asset...' });
    })

router
    .post('/upload', uploadImagesMiddleWare, uploadImage
        // async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //         const files = req.files as Express.Multer.File[]


        //         const outDir = path.resolve(__dirname, '../../../../public/assets')
        //         await sharp(files[0].buffer)
        //             .resize(1000, 1000, {
        //                 fit: 'inside',
        //             }).
        //             toFormat('png')
        //             .toFile(
        //                 path.resolve(outDir, cuid() + '.png')
        //             )

        //         return res.json({
        //             fileName: null,
        //         })
        //     } catch (error) {
        //         next(error)
        //     }
        // }
    )
router.route('/demo').get(async (req: Request, res: Response) => {
    res.send('hello')
})

export default router;