/**
* @function watchApi
* @description 初始化SDK 
* @param config {Map} 基础配置 
* @return void
* @author iiijr
*/
export function watchApi() {
  const pathAction = new Array();
  history.pushState = bindHistoryEvent('pushState');
  history.pushState = bindHistoryEvent('replaceState');
}


/**
* @function bindHistoryEvent
* @description 封装自定义事件，为获取用户路由信息 
* @param type {String} 事件名称
* @return function
* @author iiijr
*/
function bindHistoryEvent(type) {
  const historyEvent = history[type];
  return function() {
    const newEvent = historyEvent.apply(this, arguments); //执行history函数
    const e = new Event(type);  //声明自定义事件
    e.arguments = arguments;
    window.dispatchEvent(e);  //抛出事件
    return newEvent;  //返回方法，用于重写history的方法
  };
};
