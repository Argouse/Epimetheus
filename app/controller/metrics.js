const config = require('../config/config.js');
const client = require('prom-client');
const http = require('http');

const register = new client.Registry();

let gateway = new client.Pushgateway(config.pushgateway.url, {
  timeout: 5000, //Set the request timeout to 5000ms
  agent: new http.Agent({
    keepAlive: true,
    keepAliveMsec: 10000,
    maxSockets: 5,
  }),
}, register);

let calculateBonus = (funcName, funcParam) => {
  for (const func of Object.keys(typeArr)) {
    if (funcName === func) {
      return typeArr[funcName](...funcParam);
    }
  }
  return funcParam[1].json({ code: '404', message: 'type not found' });
}

// {
//   "reportid": "114514",
//   "type": "pageStay",
//   "data": {
//       "pageUrl": "http://localhost:3000/testPV.html",
//       "time": "114514"
//   }
// }
const gaugePageStay = new client.Gauge({
  name: 'pageStay',
  help: 'pageStayTime',
  labelNames: ['pageurl'],
  registers: [register]
});
pageStay = async (req, res, next) => {
  gaugePageStay.labels({ pageurl: req.body.data.pageUrl }).set(Number(req.body.data.time));
  gateway.pushAdd({ jobName: req.body.reportid }, (err, resp, body) => { });
  res.json({ code: '200', message: 'success' });
}

// {
//   "reportid": "114514",
//   "type": "blankScreenError",
//   "data": {
//       "pageUrl": "http://127.0.0.1:5500/demoPage/",
//       "whiteScreenDOMNums": 15,
//       "timeStamp": 1659854932187
//   }
// }
const gaugeBlankScreenError = new client.Gauge({
  name: 'blankScreenError',
  help: 'blankScreenDOMNums',
  labelNames: ['pageurl'],
  registers: [register]
});
blankScreenError = async (req, res, next) => { // TODO
  gaugeBlankScreenError.labels({ pageurl: req.body.data.pageUrl }).set(Number(req.body.data.whiteScreenDOMNums));
  gateway.pushAdd({ jobName: req.body.reportid }, (err, resp, body) => { });
  res.json({ code: '200', message: 'success' });
}

// {
//   "reportid": "114514",
//   "type": "performanceInfo",
//   "data": {
//       "pageUrl": "http://127.0.0.1:5500/demoPage/",
//       "FP": 86.69999999925494,
//       "FCP": 91.09999999776483,
//       "DNS": 0,
//       "DOMready": 87.19999999925494,
//       "TCPduration": 0,
//       "requestTime": 1.199999999254942
//   }
// }
const gaugePerformanceInfo = new client.Gauge({
  name: 'pagePerformance',
  help: 'pagePerformance Time',
  labelNames: ['pageurl', 'type'],
  registers: [register]
});
performanceInfo = async (req, res, next) => {
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'FP'}).set(Number(req.body.data.FP));
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'FCP'}).set(Number(req.body.data.FCP));
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'DNS'}).set(Number(req.body.data.DNS));
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'DOMready'}).set(Number(req.body.data.DOMready));
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'TCPduration'}).set(Number(req.body.data.TCPduration));
  gaugePerformanceInfo.labels({pageurl: req.body.data.pageUrl, type: 'requestTime'}).set(Number(req.body.data.requestTime));
  gateway.pushAdd({ jobName: req.body.reportid }, (err, resp, body) => { });
  res.json({ code: '200', message: 'success' });
}

jsError = async (req, res, next) => { // TODO

}

loadingError = async (req, res, next) => { // TODO

}

unhandledError = async (req, res, next) => { // TODO

}

interfaceError = async (req, res, next) => { // TODO

}

const typeArr = {  // TODO 处理策略
  "pageStay": pageStay,
  "blankScreenError": blankScreenError,
  "performanceInfo": performanceInfo,
  "jsError": jsError,
  "loadingError": loadingError,
  "unhandledError": unhandledError,
  "interfaceError": interfaceError
}

module.exports = { calculateBonus };