import { Request, Response, Router } from "express";
import { UserController } from "./controller";
const { login } = UserController;

const router: Router = Router();

router.route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'Hello users!' });
    })

router.route('/login')
    .post(login);

router.route('/:id')
    .get((req: Request, res: Response) => {
        if (req.params.id === '1') {
            throw new Error('User not found');
        }
        res.status(200).json({ message: 'Hello user with id: ' + req.params.id });
    })

export default router;