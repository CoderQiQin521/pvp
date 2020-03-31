<template>
  <div id="app">
    <div class="bg-success text-white" style="padding: 10px;">asd</div>
    <button class="btn-success">123</button>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <HelloWorld class="text-white pp" msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style>
.pp {
  padding: 20px;
}
</style>
