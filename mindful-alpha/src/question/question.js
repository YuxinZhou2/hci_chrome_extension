import Vue from "vue";
import App from "./App";
import BootstrapVue from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

chrome.storage.local.get({ questionType: "" }, result => {
  console.log(result);
  var questionType = result.questionType;
  chrome.storage.local.get({ codingLanguage: "" }, result => {
    var codingLanguage = result.codingLanguage;
    chrome.storage.local.get({ codingDifficulty: "" }, result => {
      var codingDifficulty = result.codingDifficulty;
      chrome.storage.local.get({ languageDifficulty: "" }, result => {
        var languageDifficulty = result.languageDifficulty;
        if (questionType === "") {
          chrome.storage.local.set({ questionType: "coding" }, () => {});
        }
        if (codingLanguage === "") {
          chrome.storage.local.set({ codingLanguage: "java" }, () => {});
        }
        if (codingDifficulty === "") {
          chrome.storage.local.set({ codingDifficulty: "easy" }, () => {});
        }
        if (languageDifficulty === "") {
          chrome.storage.local.set({ languageDifficulty: "easy" }, () => {});
        }
      });
    });
  });
});

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(document.getElementsByClassName("binyuan").length == 0);
  if (document.getElementsByClassName("binyuan").length <= 1) {
    console.log(document.getElementsByClassName("binyuan"));
    chrome.storage.local.get("blacklists", result => {
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
}
