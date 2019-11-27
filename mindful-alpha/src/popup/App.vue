<template>
  <div id="mindful-popup">
    <header>
      <div id="logo">
        <img src="../icons/logo.png" alt="Mindful" />
        <span id="title">Mindful</span>
      </div>
    </header>
    <label>Choose Category</label>
    <select @change="onChange($event)" v-model="selected" class="mb-3">
      <option disabled value>Please select one</option>
      <option>Coding</option>
      <option>Languages</option>
      <option>Customized</option>
    </select>
    <label>Repeat Every:</label>
    <select @change="onTimeChange($event)" v-model="timeInterval" class="mb-3" id="timeSelect">
      <option disabled value>Please select one</option>
      <option>5</option>
      <option>10</option>
      <option>20</option>
      <option>25</option>
    </select>
    <span>min</span>
    <div v-if="selected === 'Coding'" class="coding-settings">
      <h2>Coding Questions Settings</h2>
      <div class="coding-language">
        <label for="coding-language-picker">Coding Language</label>
        <select @change="onCodingLanguageChange($event)" v-model="codingLanguagePicker">
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </div>
      <div class="coding-difficulty">
        <label for="difficulty-picker">Difficulty</label>
        <select
          @change="onCodingDifficultyChange($event)"
          id="difficulty-picker"
          v-model="codingDifficulty"
        >
          <option disabled value>Please select one</option>
          <option value="easy">Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
    <div v-else-if="selected === 'Languages'" class="languages-settings">
      <h2>Language Questions</h2>
      <label for="language-picker">Language</label>
      <select @change="onLanguageChange($event)" v-model="languagePicker">
        <option disabled value>Please select one</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
      </select>
      <label for="difficulty-picker">Difficulty</label>
      <select
        @change="onLanguageDifficultyChange($event)"
        v-model="languageDifficulty"
        id="difficulty-picker"
      >
        <option disabled value>Please select one</option>
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div v-else-if="selected === 'Customized'" class="customize-settings">
      <h2>Customized Questions</h2>
      <textarea v-model="customQuestion" placeholder="add question" id="addQuestion"></textarea>
      <textarea v-model="customAnswer" placeholder="answer" id="addAnswer"></textarea>
      <button
        @click="saveQuestion(customQuestion,customAnswer,customQuestions)"
        id="saveQuestion"
      >Add</button>
      <div>
        <ul>
          <li v-for="question in customQuestions" v-bind:key="question.customQuestion">
            {{question.customQuestion+ "? "+ question.customAnswer}}
            <button
              @click="removeCustomQuestion(question, customQuestions)"
              class="remove-button"
            >-</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="blacklist">
      <h2>Blacklist</h2>
      <div class="form">
        <textarea v-model="site" id="site" placeholder="Enter URL"></textarea>
        <button type="button" @click="addBlacksite(site, blacklists)" id="add-button">+</button>
      </div>
      <div>
        <ul>
          <li v-for="blacklist in blacklists" v-bind:key="blacklist.id">
            {{blacklist}}
            <button
              @click="removeBlacksite(blacklist, blacklists)"
              class="remove-button"
            >-</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languagePicker: "",
      selected: "",
      customQuestions: [],
      customQuestion: "",
      customAnswer: "",
      blacklists: [],
      blacklist: "",
      site: "",
      question: "",
      codingLanguagePicker: "",
      timeInterval: "",
      languageDifficulty: "",
      codingDifficulty: ""
    };
  },
  created: function() {
    chrome.storage.local.get({ languageDifficulty: "" }, result => {
      this.languageDifficulty = result.languageDifficulty;
    });
    chrome.storage.local.get({ language: "" }, result => {
      this.languagePicker = result.language;
    });
    chrome.storage.local.get({ codingLanguage: "" }, result => {
      this.codingLanguagePicker = result.codingLanguage;
    });
    chrome.storage.local.get({ codingDifficulty: "" }, result => {
      this.codingDifficulty = result.codingDifficulty;
    });
    chrome.storage.local.get({ customQuestions: [] }, result => {
      this.customQuestions = result.customQuestions;
    });

    chrome.storage.local.get({ questionType: "coding" }, result => {
      this.selected = result.questionType;
    });

    chrome.storage.local.get({ repeatInterval: "" }, result => {
      this.timeInterval = result.repeatInterval;
    });

    chrome.storage.local.get(["blacklists"], result => {
      this.blacklists = result.blacklists;
    });
  },
  methods: {
    onChange: function(event) {
      chrome.storage.local.set({ questionType: event.target.value }, () => {});
    },
    onTimeChange: function(event) {
      chrome.storage.local.set(
        { repeatInterval: event.target.value },
        () => {}
      );
    },
    onCodingLanguageChange: function(event) {
      chrome.storage.local.set(
        { codingLanguage: event.target.value },
        () => {}
      );
    },
    onCodingDifficultyChange: function(event) {
      chrome.storage.local.set(
        { codingDifficulty: event.target.value },
        () => {}
      );
    },
    onLanguageChange(event) {
      chrome.storage.local.set({ language: event.target.value }, () => {});
    },
    onLanguageDifficultyChange(event) {
      chrome.storage.local.set(
        { languageDifficulty: event.target.value },
        () => {}
      );
    },
    addBlacksite: function(site, blacklists) {
      this.site = "";
      chrome.storage.local.get({ blacklists: [] }, result => {
        if (site) {
          result.blacklists.push(site);
          this.blacklists = result.blacklists;
        }
        chrome.storage.local.set({ blacklists: result.blacklists }, () => {});
      });
    },
    removeBlacksite: function(site, blacklists) {
      for (var i = 0; i < this.blacklists.length; i++) {
        if (this.blacklists[i] === site) {
          this.blacklists.splice(i, 1);
        }
      }
      chrome.storage.local.get({ blacklists: [] }, result => {
        chrome.storage.local.set({ blacklists: this.blacklists }, () => {});
      });
    },
    removeCustomQuestion: function(question, customQuestions) {
      for (var i = 0; i < this.customQuestions.length; i++) {
        console.log(this.customQuestions[i]);
        if (this.customQuestions[i] === question) {
          this.customQuestions.splice(i, 1);
        }
      }
      chrome.storage.local.get({ customQuestions: [] }, result => {
        chrome.storage.local.set(
          { customQuestions: this.customQuestions },
          () => {}
        );
      });
    },
    saveQuestion: function(customQuestion, customAnswer, customQuestions) {
      this.customQuestion = "";
      this.customAnswer = "";
      chrome.storage.local.get({ customQuestions: [] }, result => {
        var q = result.customQuestions;

        this.customQuestions.push({
          customQuestion: customQuestion,
          customAnswer: customAnswer
        });
        chrome.storage.local.set(
          { customQuestions: this.customQuestions },
          () => {}
        );
      });
    }
  }
};
</script>

<style src="../css/popup.css"></style>
