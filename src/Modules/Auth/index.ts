import { Router } from "express";
import { JoiValidator } from "../../middlewares/common";
import { login, signup, sendOtp, verifyOtp } from "./controller";
import { authRouteSchema } from "./inputSchema";


const router = Router();


router.route('/login')
    .post(JoiValidator(authRouteSchema['login']), login)

router.route('/signup')
    .post(signup)

router.route('/send-otp')
    .post(sendOtp)

router.route('/verify-otp')
    .post(verifyOtp)


export default router;