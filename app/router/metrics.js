const { metricsFunc } = require('../controller/metrics.js');
const express = require("express");
const router = express.Router();

const REPORT_ID = process.env.REPORT_ID || '114514';
router.post("/report", async (req, res, next) => {
    try {
        // 处理请求
        if (req.body.reportid != REPORT_ID) {
          return res.json({ code: '403', message: '无权限' });
        }
        metricsFunc(req.body.type, [req, res, next])
    } catch (err) {
        next(err);
    }
});

module.exports = router;