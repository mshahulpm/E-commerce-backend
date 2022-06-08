import { Router } from "express";
import { login, signup, sendOtp, verifyOtp } from "./controller";


const router = Router();


router.route('/login')
    .post(login)

router.route('/signup')
    .post(signup)

router.route('/send-otp')
    .post(sendOtp)

router.route('/verify-otp')
    .post(verifyOtp)


export default router;