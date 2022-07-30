/**
* @function watchApi
* @description 初始化SDK 
* @param config {Map} 基础配置 
* @return void
* @author iiijr
*/
export function watchApi() {
  // const pathAction = new Array();
  // console.log(history.pushState)
  console.log("into watchApi");
  console.log('THEY DID IT AGAIN! replaceState 111111');
  window.onpopstate = function(event) {
    alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
  };
  history.pushState = bindHistoryEvent('pushState');
  history.replaceState = bindHistoryEvent('replaceState');
  window.addEventListener('replaceState', function(e) {
    console.log('THEY DID IT AGAIN! replaceState 111111');
  });
  window.addEventListener('pushState', function(e) {
    console.log('THEY DID IT AGAIN! pushState 2222222');
  });
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

