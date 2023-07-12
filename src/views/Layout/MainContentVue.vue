<template>
    <main>
        <div class="main-content" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
            <router-view />
        </div>
    </main>    
</template>

<script lang="ts" setup>
import { darkMode } from "@/darkMode";
</script>

<style scoped>
main {
    height: 100%;
    padding: 10px;
    background-color: rgb(224 224 224);
}
.main-content {
    overflow-y: auto;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
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