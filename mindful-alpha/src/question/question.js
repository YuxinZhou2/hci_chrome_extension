import Vue from "vue";
import App from "./App";
import "bootstrap";

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  chrome.storage.local.get("blacklists", result => {
    var list = result.blacklists;
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (message.includes(list[i])) {
        var el = document.createElement("div");
        el.setAttribute("id", "mia");
        document.body.appendChild(el);

        new Vue({
          el: "#mia",
          render: h => h(App)
        });
      }
    }
  });
}
