<template>
  <div class="layout_page" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
    <HeaderCompVue />
    <MainContentVue />
  </div>
</template>

<script lang="ts" setup>
import { darkMode, toggleMode } from "@/darkMode";
import HeaderCompVue from "./Layout/HeaderCompVue.vue";
import SideBarComVueVue from "./Layout/SideBarComVue.vue";
import MainContentVue from "./Layout/MainContentVue.vue";

</script>

<style scoped>
.light_mode_on {
  background-color: #fff;
  color: #333;
}

.dark_mode_on {
  background-color: #333;
  color: #fff;
}

.layout_page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
