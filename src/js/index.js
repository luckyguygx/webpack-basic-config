/*
 * @Descripttion: index.js
 * @version: 1.0.0
 * @Author: xinxin
 * @Date: 2020-03-11 13:48:21
 * @lastEditTime: ...
 */
import '../css/index.less';
import { debounce } from 'lodash-es'; // 如果想要webpack treeshaking生效需要加载lodash的es版本 否则不支持shaking

// 动态加载
const btn = document.getElementById('btn');
btn.onclick = () => {
    import(/* webpackChunkName: "dynamic" */ './dynamic').then(module => {
      const fn = module.default;
      fn();
    });
};
console.log(debounce);
const linkBtn = document.getElementById('toMain');
linkBtn.onclick = () => {
  window.open(`${window.location.host}/main.html`);
};
// 热更替
if (module.hot) {
  module.hot.accept();
}
