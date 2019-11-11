var t1 =
  '<div class="bg-modal">' +
  '<div class="question-modal">' +
  '<div class="question">' +
  "<label>Which statement is true regarding an object?</label>" +
  '<div class="choice-container">' +
  '<button class="choice-buttons" id="incorrect">An object is what classes instantiated are from</button>' +
  '<button class="choice-buttons" id="correct">An object is an instance of a class</button>' +
  '<button class="choice-buttons" id="incorrect1">An object is a variable</button>' +
  '<button class="choice-buttons" id="incorrect2">An object is a reference to an attribute</button>' +
  "</div>" +
  "</div>" +
  '<div class="question2">' +
  "<label>Multiple inheritance means:</label>" +
  '<div class="choice-container">' +
  '<button class="choice-buttons" id="correct1">One class inheriting from more super classes</button>' +
  '<button class="choice-buttons" id="incorrect3">More classes inheriting from one super class</button>' +
  '<button class="choice-buttons" id="incorrect4">More classes inheriting from more super classes</button>' +
  '<button class="choice-buttons" id="incorrect5">None of the above</button>' +
  "</div>" +
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

$("#correct1").click(function() {
  $("#correct1").css("background-color", "#74DF00");
  $(".navigation").css("display", "inline");
});

$("#incorrect").click(function() {
  $("#correct").css("background-color", "#74DF00");
  $("#incorrect").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#incorrect1").click(function() {
  $("#correct").css("background-color", "#74DF00");
  $("#incorrect1").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#incorrect2").click(function() {
  $("#correct").css("background-color", "#74DF00");
  $("#incorrect2").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#incorrect3").click(function() {
  $("#correct1").css("background-color", "#74DF00");
  $("#incorrect3").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#incorrect4").click(function() {
  $("#correct1").css("background-color", "#74DF00");
  $("#incorrect4").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#incorrect5").click(function() {
  $("#correct1").css("background-color", "#74DF00");
  $("#incorrect5").css("background-color", "red");
  $(".navigation").css("display", "inline");
});

$("#access-website").click(function() {
  $(".bg-modal").css("display", "none");
});

$("#another-question").click(function() {
  $(".question").css("display", "none");
  $(".navigation").css("display", "none");
  $(".question2").css("display", "block");
});
