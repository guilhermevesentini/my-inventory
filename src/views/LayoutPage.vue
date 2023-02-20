<template>
  <div class="layout_page" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }">
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

        <i class="material-icons">settings</i>
      </div>
    </header>
    <main>
      <div class="sidebar">
        <ul>
          <router-link to="/dashboard" v-slot="{ navigate }">
            <li @click="navigate"><i class="material-icons">dashboard</i></li>
          </router-link>
          <router-link to="/inventory" v-slot="{ navigate }">
            <li @click="navigate"><i class="material-icons">inventory_2</i></li>
          </router-link>
        </ul>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { darkMode, toggleMode } from "@/darkMode";

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
  height: 100vh;
  overflow: hidden;
}

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


main {
  display: flex;
}

.sidebar {
  text-align: center;
  width: 10%;
  color: #fff;
  height: 100vh;

}

.sidebar ul {
  background-color: #1a1a1a;
  width: 50%;
  margin-left: 20%;
  border-radius: 10%;
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 20px;
}

.sidebar ul a {
  color: #fff;
}


.main-content {
  width: 100%;
}

.adicionar_produto {
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 40%;
  padding: 10px;
  font-size: 10px;
  opacity: 0.9;
}
</style>
