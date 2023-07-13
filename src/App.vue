<template>
  <router-view />
</template>

<script lang="ts" setup>
import { isAuthenticated } from '../auth';
import { useRouter } from 'vue-router'

const router = useRouter()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
});

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
}
body, html {
  height: 100%;
}
i {
  cursor: pointer;  
}
@import '~apexcharts/dist/apexcharts.css';
</style>
