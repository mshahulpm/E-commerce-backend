import { Request, Response, Router } from "express";
const router = Router();



router.route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'welcome to order' });
    })


export default router;