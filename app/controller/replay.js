const config = require('../config/config.js');
const winston = require('winston')
const LokiTransport = require("winston-loki");

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: config.loki.url,
      json: true,
      labels: { job: 'epimetheus-replay' }
    })
  ]
});

let replayFunc = (funcName, funcParam) => {
  for (const func of Object.keys(typeArr)) {
    if (funcName === func) {
      return typeArr[funcName](...funcParam);
    }
  }
  return funcParam[1].json({ code: '404', message: 'type not found' });
}

// {
//   "reportid": "114514",
//   "type": "originInfo",
//   "data": {
          // "domInfo": "<body> ... </body>",
          // "timeStamp": 1660874344217,
          // "pageUrl": "http://127.0.0.1:5500/"
//   }
// }
originInfo = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'originInfo' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

DOMupdate = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'DOMupdate' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

buttonClick = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'buttonClick' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

textUpdate = async (req, res, next) => {
  logger.info({ message: JSON.stringify(req.body.data), labels: {'type': 'textUpdate' , 'reportid': req.body.reportid, 'pageurl': req.body.data.pageUrl } });
  res.json({ code: '200', message: 'success' });
}

const typeArr = {  // TODO 处理策略
  'originInfo': originInfo,
  'DOMupdate': DOMupdate,
  'buttonClick': buttonClick,
  'textUpdate': textUpdate
}

module.exports = { replayFunc };