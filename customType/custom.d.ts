declare namespace Express {
    export interface Request {
        user?: {
            userId: string;
            email: string;
            roles: string | string[];
            [key: string]: any;
        },
        files?: {
            productImage?: Express.Multer.File[];
            categoryImage?: Express.Multer.File[];
            categoryBanner?: Express.Multer.File[];
            homeBanner?: Express.Multer.File[];
        };
    }
}