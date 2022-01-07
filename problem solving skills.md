## xfc-razer
npm包地址： https://www.npmjs.com/package/xfc-razer
源码地址： https://github.com/xiefucai/xfc-razer.git

demo验证代码： https://github.com/xiefucai/xfc-razer.git

## problem solving skills
``` typescript
// typescript declaration merging
declare function GetTotalDevices(): Promise<number>;
interface USB {
  getTotalDevices: typeof GetTotalDevices;
}

// implementation
navigator.usb.getTotalDevices = async () => {
  const devices = await navigator.usb.getDevices();
  return devices.length;
}

// call test
navigator.usb.getTotalDevices().then((num) => {
  console.log("getTotalDevices: " + num);
});
```

---

## How to share same local storage in different origin web dev server?

我大概说一些方案，方案的基本原则是只影响开发环境的localStorage存储位置，不影响生产环境的代码和数据。
### 方案一：
> 在开发模式下，各个dev server的前端html页面中植入一个js脚本，脚本的功能主要是重新实现localStorage对象，将数据的读写在其它地方实现；
> - A：在页面中加载一个共同url的iframe页面，通过window.postmessage让iframe中的js代码去完成localStorage的读写数据。
> - B：用nodejs实现一个local web server或websocket server，读写localStorage的时候调接口(需要设置其允许跨域)让server存储数据；
### 方案二：
> 将所有的dev server用nginx来代理转发，然后用同域去访问，比如http://localhost/:port/xxx 这种方式去访问，但是这种方法可能会影响前端页面的路由配置。
### 方案三：
在Chrome浏览器上安装Tampermonkey扩展，然后编写userscript脚本，在userscript里通过指定`@exclude http://xxx`将要共享的origin地址填写进去，然后在脚本里重写window.localStorage对象，将setItem和getItem拦截写入到chrome的扩展存储中。

``` js
localStorage.setItem => GM_setValue(name, value)
localStorage.getItem => GM_getValue(name, defaultValue)
```
## how to use window.open to load each page into its own process ? such that, one page is crashed, the other pages are still running properly

根据[官方文档](https://www.chromium.org/developers/design-documents/process-models), chrome浏览器确实有支持可以对单独的tab页面启用独立process, 但是需要用户在启动chrome浏览器时加上命令行参数`--process-per-tab`才可以，不支持[window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)指定参数去启动。

