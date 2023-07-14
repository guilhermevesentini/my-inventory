<template>
    <main class="" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">        
        <div class="main-content">     
            <HeaderCompVue />       
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
.main-content {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgb(224 224 224);
    height: 100vh;
}

.main-content__frame {
  padding: 0.7rem;
  margin: 0.5rem;
  border-radius: 10px;
  background-color: #fff;
  height: calc(100% - 71px);
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