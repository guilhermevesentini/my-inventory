<template>
  <header :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }" style="background-color: #0067ff; color: #fff;">
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
          <div class="dropdown">
            <i class="material-icons dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">settings</i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Configurar Conta</a></li>
              <li><a class="dropdown-item" href="#">Personalizar</a></li>
              <li><a class="dropdown-item" href="#"  style="display: flex;" @click="logout">Sair</a></li>
            </ul>
          </div>          
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
  width: 100%;
  min-height: 55px;
  padding: 0.7rem;
  z-index: 3;
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
    padding: 5px 2px 0;
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