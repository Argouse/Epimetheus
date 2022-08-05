const config = require('../config/config');
const express = require("express");
const router = express.Router();
const client = require('prom-client');
const http = require('http');

const Registry = client.Registry;
const register = new Registry();
const pagePV = new client.Counter({
    name: 'pagePV',
    help: 'page pv',
    registers: [register]
});
let gateway = new client.Pushgateway(config.pushgateway.url, {
    timeout: 5000, //Set the request timeout to 5000ms
    agent: new http.Agent({
        keepAlive: true,
        keepAliveMsec: 10000,
        maxSockets: 5,
    }),
}, register);


router.post("/", async (req, res, next) => {
    try {
        // 处理请求
        if (req.body.reportid != '114514') {
            return res.json({ code: '403', message: '无权限' });
        }
        // example: {reportid: 114514,type: pv, data: {"url": "http://localhost:3000/testPV.html", "time": "2000" }}
        if (req.body.type == 'pv') {
            pagePV.inc(Number(req.body.data.time));
            const pageurl = encodeURIComponent(req.body.data.url);
            gateway.pushAdd({ jobName: req.body.reportid, groupings: { url: pageurl } }, (err, resp, body) => {});
            res.send(pageurl);
        }

    } catch (err) {
        next(err);
    }
});


module.exports = router;