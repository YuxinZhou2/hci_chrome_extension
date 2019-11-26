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
      <!-- <option>Customized</option> -->
    </select>
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
        <select @change="onCodingDifficultyChange($event)" id="difficulty-picker">
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
      <select @change="onLanguageDifficultyChange($event)" id="difficulty-picker">
        <option disabled value>Please select one</option>
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <!-- <div v-else-if="selected === 'Customized'" class="customize-settings">
      <h2>Customized Questions</h2>
      <textarea v-model="customQuestion" placeholder="add question"></textarea>
      <textarea v-model="customAnswer" placeholder="answer"></textarea>
      <button @click="saveQuestion(customQuestion,customAnswer,customQuestions)">Add</button>
      <div>
        <ul>
          <li
            v-for="question in customQuestions"
            v-bind:key="question.customQuestion"
          >{{question.customQuestion+ ":"+ question.customAnswer}}</li>
        </ul>
      </div>
    </div>-->
    <div class="blacklist">
      <h2>Blacklist</h2>
      <div>
        <textarea v-model="site" placeholder="Enter URL"></textarea>
        <button type="button" @click="addBlacksite(site, blacklists)" id="add-button">+</button>
      </div>
      <div>
        <ul>
          <li v-for="blacklist in blacklists" v-bind:key="blacklist.id">
            {{blacklist}}
            <button @click="removeBlacksite(site, blacklists)" id="remove-button">-</button>
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
      customQuestions: [{}],
      customQuestion: "",
      customAnswer: "",
      blacklists: [],
      blacklist: "",
      site: "",
      question: "",
      codingLanguagePicker: ""
    };
  },
  created: function() {
    chrome.storage.local.get({ language: "" }, result => {
      this.languagePicker = result.language;
    });
    chrome.storage.local.get({ codingLanguage: "" }, result => {
      this.codingLanguagePicker = result.codingLanguage;
    });
    chrome.storage.local.get(["customQuestions"], result => {
      this.customQuestions = JSON.parse(result.customQuestions);
    });

    chrome.storage.local.get({ questionType: "coding" }, result => {
      this.selected = result.questionType;
    });

    chrome.storage.local.get(["blacklists"], result => {
      this.blacklists = result.blacklists;
    });
  },
  methods: {
    onChange: function(event) {
      chrome.storage.local.set({ questionType: event.target.value }, () => {});
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
      chrome.storage.local.get({ blacklists: [] }, result => {
        var bl = result.blacklists;
        blacklists.push(site);
        bl.push(site);
        chrome.storage.local.set({ blacklists: bl }, () => {
          console.log(blacklists);
        });
      });
    },
    removeBlacksite: function(blacklists) {
      chrome.storage.local.get({ blacklists: [] }, result => {
        chrome.storage.local.set({ blacklists: [] }, () => {});
        blacklists = [];
      });
    },
    saveQuestion: function(customQuestion, customAnswer, customQuestions) {
      chrome.storage.local.get({ customQuestions: [] }, result => {
        var q = result.customQuestions;

        customQuestions.push({
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

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);

p {
  font-size: 20px;
}
h2 {
  font-size: 20px !important;
  text-align: center;
}
select {
  border: none;
  outline: none;
  width: 200px;
  padding: 5px !important;
  background: white;
}
#mindful-popup {
  background: white;
  padding: 10px;
  width: 300px;
}
button {
  border: none;
  border-radius: 55% !important;
  background-color: white;
  padding: 2px;
  width: 25px;
  height: 25px;
  text-align: center;
  justify-content: center;
}

textarea {
  border: none;
  resize: none !important;
  border-radius: 5px !important;
  overflow: hidden !important;
  height: 25px;
  width: 200px;
  outline: none;
  padding: 5px;
  justify-content: center;
  font-size: 15px !important;
}
.languages-settings,
.coding-settings {
  background-color: #fbefef;
  padding: 20px;
  border-radius: 5px;
}
.mb-3 {
  width: 280px;
  background: #fafafa;
  padding: 5px !important;
}
#logo {
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;
}
#title {
  font-size: 40px;
  border-color: black;
}
img {
  width: 50px;
  height: 50px;
}

.blacklist {
  border-radius: 5px;
  padding: 20px;
  background: #f2f2f2;
  margin-top: 10px;
}
#add-button {
  margin: 5px;
  position: relative;
  background-color: #74df00;
  border: none;
  font-size: 20px;
  color: white;
  text-align: center;
  justify-content: center;
}

#remove-button {
}
</style>
