var t1 =
  '<div class="bg-modal">' +
  '<div class="question-modal">' +
  '<div class="question">' +
  "<label>Which statement is true regarding an object?</label>" +
  "</div>" +
  '<div class="choice-container">' +
  '<button class="choice-buttons" id="incorrect">An object is what classes instantiated are from</button>' +
  '<button class="choice-buttons" id="correct">An object is an instance of a class</button>' +
  '<button class="choice-buttons" id="incorrect">An object is a variable</button>' +
  '<button class="choice-buttons" id="incorrect">An object is a reference to an attribute</button>' +
  "</div>" +
  '<div class="navigation">' +
  '<button class="navigation-buttons" id="close-tab">Close Tab</button>' +
  '<button class="navigation-buttons" id="another-question">Another Question</button>' +
  '<button class="navigation-buttons" id="access-website">Access Website</button>' +
  "</div>" +
  "</div>" +
  "</div>";
$("body").append(t1);

$("#correct").click(function() {
  $("#correct").css("background-color", "#74DF00");
  $(".navigation").css("display", "inline");
});

$("#incorrect").click(function() {
  $("#correct").css("background-color", "#74DF00");
  $("#incorrect").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#access-website").click(function() {
  $(".bg-modal").css("display", "none");
});

$("#close-tab").click(function() {
  open("", "_self").close();
});
