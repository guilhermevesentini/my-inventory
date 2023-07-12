<template>
  <div class="layout_page" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
    <HeaderCompVue />
    <div class="wrapper">
      <div class="row">
        <div class="col-2" style="padding-right: 0;">
          <SideBarComVueVue />
        </div>
        <div class="col-10" style="padding-left: 0;">
          <MainContentVue />
        </div>
      </div>
    </div>    
  </div>
</template>

<script lang="ts" setup>
import { darkMode, toggleMode } from "@/darkMode";
import HeaderCompVue from "./HeaderCompVue.vue";
import SideBarComVueVue from "./SideBarComVue.vue";
import MainContentVue from "./MainContentVue.vue";

</script>

<style>
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
  height: 100%;
}
.wrapper {
  height: 100%;
}
.wrapper .row {
  height: 100%;
}
</style>
