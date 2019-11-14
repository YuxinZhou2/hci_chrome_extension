<template>
  <div class="binyuan">
    <div class="question-modal">
      <div v-if="questionsAvailable">
        <p>{{questions[questionIndex].question}}</p>
        <button
          value="0"
          type="button"
          class="btn btn-primary btn-lg btn-block"
          disable
          @click="handleButton($event)"
        >{{questions[questionIndex].answers[0]}}</button>
        <button
          value="1"
          type="button"
          class="btn btn-primary btn-lg btn-block"
          disable
          @click="handleButton($event)"
        >{{questions[questionIndex].answers[1]}}</button>
        <button
          value="2"
          type="button"
          class="btn btn-primary btn-lg btn-block"
          disable
          @click="handleButton($event)"
        >{{questions[questionIndex].answers[2]}}</button>
        <button
          value="3"
          type="button"
          class="btn btn-primary btn-lg btn-block"
          disable
          @click="handleButton($event)"
        >{{questions[questionIndex].answers[3]}}</button>
        <div v-if="answered">
          <button @click="nextQuestion()">Next Question</button>
          <button @click="accessWebsite()">Access Website</button>
        </div>
      </div>
      <div v-else>
        <p>No more questions!</p>
      </div>
    </div>
  </div>
</template>

<script>
import codingQuestions from "./codingQuestions.json";
import languageQuestions from "./languageQuestions.json";

export default {
  data() {
    return {
      blacklists: [],
      questions: [],
      questionIndex: 0,
      answered: false,
      questionsAvailable: true
    };
  },
  methods: {
    accessWebsite: function() {
      var el = document.getElementsByClassName("binyuan");
      console.log(el);
      for (var i = 0; i < el.length; i++) {
        el[i].style.display = "none";
      }
    },
    nextQuestion: function() {
      this.questionIndex++;
      this.answered = false;
      // var buttons = document.getElementsByClassName(
      //   "btn btn-primary btn-lg btn-block"
      // );
      // for (var i = 0; i < buttons.length; i++) {
      //   buttons[i].style.backgroundColor = "white";
      // }
      if (this.questionIndex > this.questions.length) {
        this.questionsAvailable = false;
      }
    },
    handleButton: function(event) {
      event.preventDefault();
      if (event.target.value == this.questions[this.questionIndex].index) {
        event.target.style.backgroundColor = "green";
      } else {
        event.target.style.backgroundColor = "red";
      }
      this.answered = true;
    },
    shuffle: function(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  },
  mounted: function() {
    chrome.storage.local.get(["questionType"], result => {
      var type = result.questionType;
      if (type === "Coding") {
        chrome.storage.local.get({ codingLanguage: "" }, result => {
          var codingLanguage = result.codingLanguage;
          chrome.storage.local.get({ codingDifficulty: "" }, result => {
            var codingDifficulty = result.codingDifficulty;
            this.questions = codingQuestions.coding.filter(el => {
              return (
                codingLanguage === el.codingLanguage.toLowerCase() &&
                codingDifficulty === el.difficulty
              );
            });
          });
        });
      } else if (type === "Languages") {
        chrome.storage.local.get({ language: "" }, result => {
          var language = result.language;
          chrome.storage.local.get({ languageDifficulty: "" }, result => {
            var languageDifficulty = result.languageDifficulty;
            this.questions = languageQuestions.language.filter(el => {
              return (
                language === el.language.toLowerCase() &&
                languageDifficulty === el.difficulty
              );
            });
            console.log(this.questions);
          });
        });
      }
      // } else if (type === "customQuestions") {
      //   chrome.storage.local.get("customQuestions", result => {
      //     this.questions = result.customQuestions;
      //   });
      // }
    });
  }
};
</script>

<style>
.binyuan {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed !important;
  top: 0;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 12345678;
  overflow-y: hidden !important;
}

.question-modal {
  width: 1000px;
  height: 500px;
  background-color: white;
  position: relative;
  text-align: center;
  margin: 50px auto;
  justify-content: center;
  border-radius: 4px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
