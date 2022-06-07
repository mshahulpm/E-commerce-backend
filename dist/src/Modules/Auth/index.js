"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.route('/login')
    .post(controller_1.login);
router.route('/signup')
    .post(controller_1.signup);
router.route('/send-otp')
    .get(controller_1.sendOtp);
router.route('/verify-otp')
    .post(controller_1.verifyOtp);
exports.default = router;
