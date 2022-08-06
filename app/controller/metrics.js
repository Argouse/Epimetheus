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

let calculateBonus = (funcName ,funcParam) => {
  for(const func of Object.keys(typeArr)) {
    if(funcName === func) {
      return typeArr[funcName](...funcParam);
    }
  }
  return funcParam[1].json({ code: '404', message: 'type not found' });
}

const gaugePageStay = new client.Gauge({
  name: 'pageStay',
  help: 'pageStayTime',
  registers: [register]
});
pageStay = async (req, res, next) => {
  gaugePageStay.set(Number(req.body.data.time));
  const pageurl = encodeURIComponent(req.body.data.pageUrl);
  gateway.pushAdd({ jobName: req.body.reportid, groupings: { url: pageurl } }, (err, resp, body) => {});
  res.json({ code: '200', message: 'success' });
}

const gaugePagePerformance = new client.Gauge({
  name: 'pagePerformance',
  help: 'pagePerformance Time',
  labelNames: ['FP', 'FCP'],
  registers: [register]
});
pagePerformance = async (req, res, next) => {
  gaugePagePerformance.set(Number(req.body.data.time));
  const pageurl = encodeURIComponent(req.body.data.url);
  gateway.pushAdd({ jobName: req.body.reportid, groupings: { url: pageurl } }, (err, resp, body) => {});
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

const gaugeWhiteScreen = new client.Gauge({
  name: 'whiteScreen',
  help: 'whiteScreenDOMNums',
  labelNames: ['pageurl'],
  registers: [register]
});
whiteScreen = async (req, res, next) => { // TODO
  gaugeWhiteScreen.set(Number(req.body.data.whiteScreenDOMNums));
  const pageurl = encodeURIComponent(req.body.data.pageUrl);
  gateway.pushAdd({ jobName: req.body.reportid, groupings: { url: pageurl } }, (err, resp, body) => {});
  res.json({ code: '200', message: 'success' });
}

const typeArr = {  // TODO 处理策略
  "pageStay": pageStay,
  "pagePerformance": pagePerformance,
  "jsError": jsError,
  "loadingError": loadingError,
  "unhandledError": unhandledError,
  "interfaceError": interfaceError,
  "whiteScreen": whiteScreen
}

module.exports = {calculateBonus};