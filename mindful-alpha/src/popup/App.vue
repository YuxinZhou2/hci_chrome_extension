<template>
  <div>
    <h1>Mindful</h1>
    <div class="coding-settings">
      <h2>Coding Questions Settings</h2>
      <div class="programming-language">
        <label for="programming-language-picker">Programming Language</label>
        <select id="programming-language-picker">
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div class="difficulty">
        <label for="difficulty-picker">Difficulty</label>
        <select id="difficulty-picker">
          <option value="easy">Easy</option>
          <option value="intermediate">Intermediate</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
