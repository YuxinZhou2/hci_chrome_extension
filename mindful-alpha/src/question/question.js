import Vue from "vue";
import App from "./App";
import "bootstrap";

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
  var url = tabs[0].url;
  chrome.storage.local.get(["blacklists"], result => {
    for (var i = 0; i < result.length; i++) {
      if (url.includes(result[i])) {
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
});
