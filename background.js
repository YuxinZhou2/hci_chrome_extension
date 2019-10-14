chrome.tabs.onUpdated.addListener(blacklistSiteEntered);

function blacklistSiteEntered(tabId, changeInfo, tab) {
  let msg = {
    txt: "hello"
  };
  chrome.tabs.sendMessage(tabId, msg);
}
