<template>
  <div class="layout_page" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">    
    <div class="wrapper">
      <div class="wrapper_container row">
        <div class="col-2 wrapper_sidebar" style="padding-right: 0;">
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
import Footer from "./FooterLayout.vue";

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
}

.wrapper_sidebar {
  box-shadow: 6px -1px 12px -5px rgba(0,0,0,0.75);
-webkit-box-shadow: 6px -1px 12px -5px rgba(0,0,0,0.75);
-moz-box-shadow: 6px -1px 12px -5px rgba(0,0,0,0.75);
}
</style>
