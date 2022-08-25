const { replayFunc } = require('../controller/replay.js')
const config = require('../config/config.js');
const express = require("express");
const router = express.Router();


router.post("/report", async (req, res, next) => {
    try {
        // 处理请求
        if (req.body.reportid != config.reportid) {
          return res.json({ code: '403', message: '无权限' });
        }
        replayFunc(req.body.type, [req, res, next])
    } catch (err) {
        next(err);
    }
});

// 灵
// {
//         "reportid": "114514",
//         "type": "originInfo",
//         "data": []
// }
let replayData = [];
router.post("/reportDOMevent", async (req, res, next) => {
    try {
        if (req.body.reportid != config.reportid) {
          return res.json({ code: '403', message: '无权限' });
        }
        if (req.body.type === "originInfo"){
            replayData = [];
        }
        replayData.push(req.body.data);
        res.json({ code: '200', message: 'success' });
    } catch (err) {
        next(err);
    }
});

router.get("/getDOMevent", async (req, res, next) => {
    try {
        if (req.query.reportid != config.reportid) {
            return res.json({ code: '403', message: '无权限' });
        }
        res.json({ code: '200', message: 'success', data: replayData });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
