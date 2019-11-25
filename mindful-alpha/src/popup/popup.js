import Vue from "vue";
import App from "./App";
import BootstrapVue from "bootstrap-vue";
import { BButton } from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.component("b-button", BButton);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});
