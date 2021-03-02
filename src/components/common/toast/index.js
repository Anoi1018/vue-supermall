import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {

  //以下四步实现Toast组件template部分挂载到body上 实现渲染
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //2.new 组件构造器 产生组件
  const toast = new toastConstructor();

  //3.将创建好的组件 手动挂载到dom元素上
  toast.$mount(document.createElement('div'));

  //4.将toast.$el 即创建好的元素div 挂载到document.body末尾
  document.body.appendChild(toast.$el);

  //实现所有vue示例可通过this.$toast拿到Toast组件
  //注意此处是toast 不是Toast
  Vue.prototype.$toast= toast;
}
export default obj
