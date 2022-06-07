import { Request, Response, Router } from "express";
const router = Router();



router.route('/send-signup-email')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'welcome to mail' });
    })


export default router;