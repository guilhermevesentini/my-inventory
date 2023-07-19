<template>
  <header :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
    <div class="row" style="padding-right: 0;" >      
      <div class="header_menu">        
        <div class="header_menu__icons">
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
      </div>
    </div>

  </header>
</template>

<script lang="ts" setup>
import router from '@/router';
import { clearLocalStorage } from '@/utils';
import { darkMode, toggleMode } from "@/composables/shared/darkMode";

const logout = (() => {
  clearLocalStorage()
  router.push({ path: `/login` });
})

</script>

<style scoped>
header {
  position: sticky;
  background-color: #fff;
  width: 100%;
  min-height: 55px;
  padding: 0.7rem;
  box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
  -webkit-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
  -moz-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
}
header .logo {
  display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
}
.header_menu {
  display: flex;
  justify-content: flex-end;
    align-items: center;
    padding: 0 2rem;
}

.header_menu__icons {
  display: flex;
}

header img {
  height: 2rem;
}

header i {
  margin: 0 10px;
}
</style>