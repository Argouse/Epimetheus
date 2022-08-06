const {calculateBonus} = require('../controller/metrics.js');
const config = require('../config/config.js');
const express = require("express");
const router = express.Router();


router.post("/report", async (req, res, next) => {
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

router.post("/init", async (req, res, next) => {
    try {
        // 处理请求
        if (req.body.reportid != '114514') {
          return res.json({ code: '403', message: '无权限' });
        }
        // 初始化
        return res.json({ code: '200', message: 'to be continued' });

    } catch (err) {
        next(err);
    }
});


module.exports = router;