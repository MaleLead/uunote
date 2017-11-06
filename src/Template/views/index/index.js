import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
