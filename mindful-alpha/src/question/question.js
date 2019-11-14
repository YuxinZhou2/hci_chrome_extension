import Vue from "vue";
import App from "./App";
import "bootstrap";


chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  chrome.storage.local.get("blacklists", result => {
    console.log("allo");
    var list = result.blacklists;
    for (var i = 0; i < list.length; i++) {
      //creating modal popup only if the url entered is part of the blacklist
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
