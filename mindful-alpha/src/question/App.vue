<template>
  <div v-html="body">
    <div class="bg-modal">
      <div class="question-modal">
        <div class="question"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "My new tab page"
    };
  }
};
</script>

<style scoped>
.bg-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed !important;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  overflow-y: hidden;
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
</style>
