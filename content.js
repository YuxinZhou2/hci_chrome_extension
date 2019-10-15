chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, response) {
  console.log(message.txt);
  if (message.txt === "hello") {
    var t1 =
      '<div class="bg-modal">' +
      '<div class="question-modal">' +
      '<div class="question">' +
      "<label>Which statement is true regarding an object?</label>" +
      "</div>" +
      '<div class="choice-container">' +
      '<button class="choice-buttons">An object is what classes instantiated are from</button>' +
      '<button class="choice-buttons">An object is an instance of a class</button>' +
      '<button class="choice-buttons">An object is a variable</button>' +
      '<button class="choice-buttons">An object is a reference to an attribute</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(t1);
  }
}
