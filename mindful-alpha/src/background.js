chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var message = tab.url;
  chrome.tabs.sendMessage(tab.id, message); //sending url to content script
});
