<template>
    <main class="" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
        <div>
            <HeaderCompVue />
        </div>
        <div class="main-content">
            <div class="main-content__frame" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
                <router-view />
            </div>            
        </div>
    </main>
</template>

<script lang="ts" setup>
import { darkMode } from "@/darkMode";
import HeaderCompVue from "./HeaderCompVue.vue";
</script>

<style scoped>
main {
    height: 100%;    
}

.main-content {
    overflow-y: auto;
    height: 93%;
    background-color: rgb(224 224 224);
}

.main-content__frame {
  padding: 0.7rem;
  margin: 0.5rem;
  border-radius: 10px;
  height: 97%;
  background-color: #fff;
}

.light_mode_on {
    background-color: #fff;
    color: #333;
}

.dark_mode_on {
    background-color: #333;
    color: #fff;
}

@media (max-width: 776px) {
    .main-content {
        margin-left: 0;
    }
}
</style>