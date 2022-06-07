import { Request, Response, Router } from "express";
import { userBasicUpdate, changePassword } from "./controller";

const router: Router = Router();

router.route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'Hello users!' });
    })

router.route('/update-basic-info')
    .post(userBasicUpdate)

router.route('/change-password')
    .post(changePassword)

export default router;