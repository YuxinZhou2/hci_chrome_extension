<template>
  <div class="binyuan">
    <div class="question-modal">
      <div v-if="questionsAvailable" class="question">
        <div v-if="!isCustomQuestion">
          <p class="mp">{{questions[questionIndex].question}}</p>
          <button
            value="0"
            type="button"
            class="btn-choices"
            disable
            @click="handleButton($event)"
          >{{questions[questionIndex].answers[0]}}</button>
          <button
            value="1"
            type="button"
            class="btn-choices"
            disable
            @click="handleButton($event)"
          >{{questions[questionIndex].answers[1]}}</button>
          <button
            value="2"
            type="button"
            class="btn-choices"
            disable
            @click="handleButton($event)"
          >{{questions[questionIndex].answers[2]}}</button>
          <button
            value="3"
            type="button"
            class="btn-choices"
            disable
            @click="handleButton($event)"
          >{{questions[questionIndex].answers[3]}}</button>
        </div>
        <div v-else>
          <p class="mp">{{questions[questionIndex].customQuestion}}</p>
          <button @click="showAnswer($event)" class="btn-choices" id="showAnswerBtn">Answer</button>
          <p v-if="answered" id="customAnswer">{{questions[questionIndex].customAnswer}}</p>
        </div>
        <div v-if="answered" id="answered">
          <button class="btn-choices" id="nextBtn" @click="nextQuestion()">Next Question</button>
          <button class="btn-choices" id="accessBtn" @click="accessWebsite()">Access Website</button>
        </div>
      </div>
      <div v-else>
        <p class="mp">No more questions!</p>
        <button class="btn-choices" @click="accessWebsite()">Access Website</button>
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
      questionsAvailable: true,
      isCustomQuestion: false
    };
  },
  methods: {
    accessWebsite: function() {
      var el = document.getElementsByClassName("binyuan");
      for (var i = 0; i < el.length; i++) {
        el[i].style.display = "none";
      }
    },
    showAnswer: function(event) {
      event.target.style.display = "none";
      this.answered = true;
    },
    nextQuestion: function() {
      this.questionIndex++;
      this.answered = false;
      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].style.backgroundColor = "#f8e0e0";
        btns[i].disabled = false;
      }

      if (this.questionIndex > this.questions.length) {
        this.questionsAvailable = false;
      }
    },
    handleButton: function(event) {
      event.preventDefault();
      if (event.target.value == this.questions[this.questionIndex].index) {
        event.target.style.backgroundColor = "#D8F6CE";
      } else {
        event.target.style.backgroundColor = "#FF0000";
      }
      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].value == this.questions[this.questionIndex].index) {
          btns[i].style.backgroundColor = "#D8F6CE";
        }
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
        this.questions = languageQuestions.language;
        // chrome.storage.local.get({ language: "" }, result => {
        //   var language = result.language;
        //   chrome.storage.local.get({ languageDifficulty: "" }, result => {
        //     var languageDifficulty = result.languageDifficulty;
        //     this.questions = languageQuestions.language.filter(el => {
        //       return (
        //         language === el.language.toLowerCase() &&
        //         languageDifficulty === el.difficulty
        //       );
        //     });
        //     console.log(this.questions);
        //   });
        // });
      } else if (type === "Customized") {
        this.isCustomQuestion = true;
        chrome.storage.local.get({ customQuestions: [] }, result => {
          console.log(result.customQuestions);
          this.questions = result.customQuestions;
        });
        console.log(this.questions);
      }
    });
  }
};
</script>