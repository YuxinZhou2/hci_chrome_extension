chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, response) {
  console.log(message.txt);
  if (message.txt === "hello") {
   document.append()
  }
}
