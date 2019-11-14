// chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
//   var url = tabs[0].url;
//   alert(url);
//   chrome.storage.local.get(["blacklists"], result => {
//     for (var i = 0; i < result.length; i++) {
//       if (url.includes(result[i])) {
//         alert(url);
//       }
//     }
//   });
// });

chrome.tabs.onCreated.addListener(function(tab) {});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var message = tab.url;
  chrome.tabs.sendMessage(tab.id, message);
});
