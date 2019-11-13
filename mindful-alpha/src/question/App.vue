<template>
  <div class="binyuan">
    <div class="question-modal">
      <p>{{codingQuestions[questionIndex].question}}</p>
      <button
        value="0"
        type="button"
        class="btn btn-primary btn-lg btn-block"
        disable
        @click="handleButton($event)"
      >{{codingQuestions[questionIndex].answers[0]}}</button>
      <button
        value="1"
        type="button"
        class="btn btn-primary btn-lg btn-block"
        disable
        @click="handleButton($event)"
      >{{codingQuestions[questionIndex].answers[1]}}</button>
      <button
        value="2"
        type="button"
        class="btn btn-primary btn-lg btn-block"
        disable
        @click="handleButton($event)"
      >{{codingQuestions[questionIndex].answers[2]}}</button>
      <button
        value="3"
        type="button"
        class="btn btn-primary btn-lg btn-block"
        disable
        @click="handleButton($event)"
      >{{codingQuestions[questionIndex].answers[3]}}</button>
      <div v-if="answered">
        <button @click="nextQuestion()">Next Question</button>
        <button @click="accessWebsite()">Access Website</button>
      </div>
    </div>
  </div>
</template>

<script>
import codingQuestions from "./codingQuestions.json";
export default {
  data() {
    return {
      blacklists: [],
      codingQuestions: [],
      questionIndex: 0,
      answered: false
    };
  },
  methods: {
    accessWebsite: function() {
      var el = document.getElementsByClassName("binyuan")[0];
      el.style.display = "none";
    },
    nextQuestion: function() {
      this.questionIndex++;
      this.answered = false;
    },
    handleButton: function(event) {
      event.preventDefault();
      if (
        event.target.value == this.codingQuestions[this.questionIndex].index
      ) {
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
  created: function() {
    this.codingQuestions = codingQuestions.coding;

    chrome.storage.local.get(["codingLanguage"], result => {
      this.codingQuestions = codingQuestions.filter(el => {
        codingQuestions.filter(el => {
          el.codingLanguage == result.codingLanguage;
        });

        chrome.storage.local.get(["codingDifficulty"], result => {
          this.codingQuestions = codingQuestions.filter(el => {
            el.codingDifficulty == result.codingDifficulty;
          });
          this.codingQuestions = shuffle(this.codingQuestions);
        });
      });
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
  z-index: 5000000;
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
