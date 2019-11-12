import Vue from "vue";
import App from "./App";

var el = document.createElement("div");
el.setAttribute("id", "mia");
document.body.appendChild(el);

new Vue({
  el: "#mia",
  render: h => h(App)
});
