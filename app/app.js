const errorHandler = require("./middleware/error-handler");


const express = require("express")

const app = express()

const PORT = process.env.PORT || 3030

const cors = require("cors")

const corsOptions = {
    credentials: true, //允许客户端携带验证信息
    origin: (origin, callback) => {
        if (origin)
            return callback(null, true)
 
        callback(new Error('Not allowed by CORS'));
    }
}
 
//全局解决跨域问题
app.use(cors(corsOptions))

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

// 解析请求体
app.use(express.json());

const metricsRouter = require("./router/metrics");
app.use("/metrics", metricsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
