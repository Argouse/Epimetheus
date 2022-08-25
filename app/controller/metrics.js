const config = require('../config/config.js');
const winston = require('winston')
const LokiTransport = require("winston-loki");

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: config.loki.url,
      json: true,
      labels: { job: 'epimetheus-metric' }
    })
  ]
});

let metricsFunc = (funcName, funcParam) => {
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
pageStay = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'pageStay' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
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
blankScreenError = async (req, res, next) => { // TODO
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'blankScreenError' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
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
performanceInfo = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'performanceInfo' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

// {
//   "reportid": "114514",
//   "type": "jsError",
//   "data": {
//       "errorMessage": "Uncaught TypeError: a.split is not a function",
//       "pageUrl": "http://127.0.0.1:5500/demoPage/",
//       "errorPosition": "27,15",
//       "errorStack": "TypeError: a.split is not a function\n    at codeError (http://127.0.0.1:5500/demoPage/:27:15)\n    at HTMLButtonElement.onclick (http://127.0.0.1:5500/demoPage/:15:48)",
//       "timeStamp": 1659854154590
//   }
// }
jsError = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'jsError' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

loadingError = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'loadingError' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

unhandledError = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'unhandledError' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

interfaceError = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'interfaceError' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

allTrace = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'allTrace' , 'reportid': req.body.reportid } });
  res.json({ code: '200', message: 'success' });
}

successRate = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'successRate' , 'reportid': req.body.reportid } });
  res.json({ code: '200', message: 'success' });
}

const typeArr = {  // TODO 处理策略
  "pageStay": pageStay,
  "blankScreenError": blankScreenError,
  "performanceInfo": performanceInfo,
  "jsError": jsError,
  "loadingError": loadingError,
  "unhandledError": unhandledError,
  "interfaceError": interfaceError,
  "allTrace": allTrace,
  "successRate": successRate
}

module.exports = { metricsFunc };
