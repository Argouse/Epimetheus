const errorHandler = require("./middleware/error-handler");


const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

// 解析请求体
app.use(express.json());
app.use(express.urlencoded());
// TODO  为客户端提供跨域资源请求
// app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
