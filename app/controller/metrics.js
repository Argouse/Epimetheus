const config = require('../config/config.default.js');
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


// // TODO Authentication 用户登录  暂时开放全部接口
// // exports.login = async (req, res, next) => {
// //   try {
// //     // 处理请求
// //     res.send("post /users/login");
// //   } catch (err) {
// //     next(err);
// //   }
// // };


let calculateBonus = (funcName ,funcParam) => {
  for(const func of Object.keys(typeArr)) {
    if(funcName === func) {
      return typeArr[funcName](...funcParam);
    }
  }
  return console.log("Not this function");
}


pv = async (req, res, next) => {
  pagePV.inc(Number(req.body.data.time));
  const pageurl = encodeURIComponent(req.body.data.url);
  gateway.pushAdd({ jobName: req.body.reportid, groupings: { url: pageurl } }, (err, resp, body) => {});
  res.send(pageurl);
}

jsError = async (req, res, next) => { // TODO

}

loadingError = async (req, res, next) => { // TODO

}

unhandledError = async (req, res, next) => { // TODO

}

interfaceError = async (req, res, next) => { // TODO

}

whiteScreen = async (req, res, next) => { // TODO

}

const typeArr = {  // TODO 处理策略
  "pv": pv,
}


module.exports = {calculateBonus};