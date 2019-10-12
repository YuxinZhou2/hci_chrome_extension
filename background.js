function startTime() {
  var start = moment();
  var timer = setInterval(function() {
    var diff = moment().diff(start, "seconds");
    updateTime(diff);
  });
}

function notifyUser() {
  var opts = {
    type: "basic",
    title: "",
    message: ""
  };
  var idBase = "";
  var id =
    idBase +
    chrome.notifications.create(id, opts, function() {
      console.log(idBase + "created");
    });
}
