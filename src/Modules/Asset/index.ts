import { uploadImagesMiddleWare } from '../../config/multer';
import { NextFunction, Request, Response, Router } from "express";
import { JoiValidator } from '../../middlewares/common';
import { AssetRouteSchema } from './inputSchema';
import {
    productImageUpload,
    categoryBannerUpload,
    categoryThumbUpload,
    homeBannerUpload,
    getAllImages,
    deleteImages
} from './controller';

const router = Router();


router.route('/')
    .get(JoiValidator(AssetRouteSchema['all-assets']), getAllImages)
    .delete(JoiValidator(AssetRouteSchema['delete-all-assets']), deleteImages)

router
    .post('/upload', uploadImagesMiddleWare,

        (req: Request, res: Response, next: NextFunction) => {

            if (req.files?.productImage) {
                productImageUpload(req, res, next)
            }
            else if (req.files?.categoryImage) {
                categoryThumbUpload(req, res, next)
            }
            else if (req.files?.categoryBanner) {
                categoryBannerUpload(req, res, next)
            }
            else if (req.files?.homeBanner) {
                homeBannerUpload(req, res, next)
            }
            else {
                next({
                    message: "No Images found",
                    status: 400
                })
            }
        },
    )




export default router;