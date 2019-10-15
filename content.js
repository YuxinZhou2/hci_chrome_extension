chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, response) {
  console.log(message.txt);
  if (message.txt === "hello") {
    // Load the function after DOM ready.
    event.preventDefault();
    //var link1 = chrome.extension.getURL("img/MailGet.png"); //Get absolute path of the file residing your extension.
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
      "</div>"; //now set the src to absolute path.
    $("body").append(t1); //Insert MailGet icon into top-right corner of Gmail home.

    // var link2 = chrome.extension.getURL("img/button_cancel.png");
    //var link3 = chrome.extension.getURL("img/AoRankLogo.png");
    // var t2 =
    //   '<div id="pop_bg" style="height: 100%; width: 100%;"></div><div id="mgt_popup"><span class="popup_close"></span><div><img id="logo" src="' +
    //   '"/></div><div id="pop_inner"><label id="user"></label><input type="button" id="mailgett" value="Go To MailGet"/></div></div>';
    // $("body").append(t2);

    //click on injected mailget icon.
    //event.preventDefault(); //first stop default behaviour of anchor.
  }
}
