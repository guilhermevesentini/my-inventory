<template>
  <div>
    <header>
      <h4>iNVETORY</h4>
      <div class="header">
        <div class="switch_mode" @click="toggleMode">
          <div class="light_mode" v-if="!darkMode">
            <i class="material-icons dark" title="Dark Mode">dark_mode</i>
          </div>
          <div class="dark_mode" v-else>
            <i class="material-icons light" title="Light Mode">light_mode</i>
          </div>
        </div>
        <i class="material-icons" @click="logout">logout</i>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { clearLocalStorage } from '@/utils';
import { darkMode, toggleMode } from "@/darkMode";

const logout = (() => {
  clearLocalStorage()
  router.push({ path: `/login` });
})

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
}
.header {
  display: flex;
  gap: 1rem;
}

header img {
  height: 2rem;
}

.header i {
  padding: 5px 10px;
}
</style>