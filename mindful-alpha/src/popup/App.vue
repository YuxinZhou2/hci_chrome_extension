<template>
  <div>
    <h1>Mindful</h1>
    <select @change="onChange($event)" v-model="selected">
      <option disabled value>Please select one</option>
      <option>Coding</option>
      <option>Languages</option>
      <option>Customized</option>
    </select>
    <div v-if="selected === 'Coding'" class="coding-settings">
      <h2>Coding Questions Settings</h2>
      <div class="coding-language">
        <label for="coding-language-picker">Coding Language</label>
        <select @change="onCodingLanguageChange($event)" id="coding-language-picker">
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div class="coding-difficulty">
        <label for="difficulty-picker">Difficulty</label>
        <select @change="onCodingDifficultyChange($event)" id="difficulty-picker">
          <option value="easy">Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
    <div v-else-if="selected === 'Languages'" class="languages-settings">
      <h2>Language Questions</h2>
      <label for="language-picker">Language</label>
      <select @change="onLanguageChange($event)" id="language-picker">
        <option value="spanish">Spanish</option>
      </select>
      <label for="difficulty-picker">Difficulty</label>
      <select @change="onLanguageDifficultyChange($event)" id="difficulty-picker">
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div v-else-if="selected === 'Customized'" class="customize-settings">
      <h2>Customized Questions</h2>
      <textarea v-model="customQuestion" placeholder="add question"></textarea>
      <textarea v-model="customAnswer" placeholder="answer"></textarea>
      <button @click="saveQuestion(customQuestion,customAnswer)">Add</button>
      <div>
        <ul>
          <li v-for="question in customQuestions" v-bind:key="question.customQuestion">{{question}}</li>
        </ul>
      </div>
    </div>
    <div class="blacklist">
      <h2>Blacklist</h2>
      <textarea v-model="blacklist" placeholder="Enter URL"></textarea>
      <button @click="addBlacksite(blacklist)">Add</button>
      <div>
        <ul>
          <li v-for="blacklist in blacklists" v-bind:key="blacklist.id">{{blacklist}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      customQuestions: [],
      customQuestion: "",
      customAnswer: "",
      blacklists: [],
      blacklist: "",
      question: ""
    };
  },
  created: function() {
    chrome.storage.local.get(["customQuestions"], result => {
      this.customQuestions = JSON.parse(result.customQuestions);
    });

    chrome.storage.local.get(["questionType"], result => {
      this.selected = result.questionType;
    });

    chrome.storage.local.get(["blacklists"], result => {
      this.blacklists = result.blacklists;
      console.log(this.blacklists);
    });
  },
  methods: {
    onChange: function(event) {
      alert(event.target.value);
      chrome.storage.local.set({ questionType: event.target.value });
    },
    onCodingLanguageChange: function(event) {
      chrome.storage.local.set({ codingLanguage: event.target.value });
    },
    onCodingDifficultyChange: function(event) {
      chrome.storage.local.set({ codingDifficulty: event.target.value });
    },
    addBlacksite: function(blacklist) {
      let bl =
        chrome.storage.local.get(["blacklists"], result => {
          this.blacklists.push(blacklist);
        }) | [];

      chrome.storage.local.set({
        blacklists: blacklists
      });
      console.log(this.blacklists);
    },
    saveQuestion: function(customQuestion, customAnswer) {
      let customQuestions =
        JSON.parse(chrome.storage.local.get(["customQuestions"])) | [];
      customQuestions.push({
        customQuestion: customQuestion,
        customAnswer: customAnswer
      });
      chrome.storage.local.set({
        customQuestions: JSON.stringify(customQuestions)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
