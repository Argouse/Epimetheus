const express = require("express");
const router = express.Router();
const client = require('prom-client');
gateway = new client.Pushgateway('http://pushgateway:9091', {
  timeout: 5000, //Set the request timeout to 5000ms
  agent: new http.Agent({
    keepAlive: true,
    keepAliveMsec: 10000,
    maxSockets: 5,
  }),
});

// const {} = require("../controller/user")

// TODO Authentication 用户登录  暂时开放全部接口
// router.post("/users/login", async (req, res, next) => {
//   try {
//     // 处理请求
//     res.send("post /users/login");
//   } catch (err) {
//     next(err);
//   }
// });

// 
router.post("/test", async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /test");
  } catch (err) {
    next(err);
  }
});

router.post("/metrics", async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /test");
  } catch (err) {
    next(err);
  }
});


module.exports = router;