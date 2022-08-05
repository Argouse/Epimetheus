const express = require("express");
const router = express.Router();
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


module.exports = router;