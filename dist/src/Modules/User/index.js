"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => {
    res.status(200).json({ message: 'Hello users!' });
});
router.route('/update-basic-info')
    .post(controller_1.userBasicUpdate);
router.route('/change-password')
    .post(controller_1.changePassword);
exports.default = router;
