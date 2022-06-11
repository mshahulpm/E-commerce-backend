import { NextFunction, Request, Response } from 'express';
import multer from 'multer'


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            // @ts-ignore
            cb({
                message: "Only images are allowed",
                status: 400
            }, false);

        }
    }
})


const uploadFiles = upload.array("images", 10); // limit to 10 images
export const uploadImagesMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                return res.status(400).json({
                    message: "Too many images exceeding the allowed limit"
                });
            }
        } else if (err) {
            return next(err);
        }
        // Everything is ok.
        next();
    });
};