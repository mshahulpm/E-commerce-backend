"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/send-signup-email')
    .get((req, res) => {
    res.status(200).json({ message: 'welcome to mail' });
});
exports.default = router;
