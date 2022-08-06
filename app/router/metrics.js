const {calculateBonus} = require('../controller/metrics.js');
const config = require('../config/config.js');
const express = require("express");
const router = express.Router();


router.post("/", async (req, res, next) => {
    try {
        // 处理请求
        if (req.body.reportid != '114514') {
          return res.json({ code: '403', message: '无权限' });
        }
        calculateBonus(req.body.type, [req, res, next])
    } catch (err) {
        next(err);
    }
});




module.exports = router;