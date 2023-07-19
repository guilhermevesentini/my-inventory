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

<style lang="scss">
@import '~apexcharts/dist/apexcharts.css';
@import '@/scss/index.scss';

* {
    box-sizing: border-box;
  }
  #app {
    font-family: -var($font-family-sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
  }
  body, html {
    height: 100%;
  }
  i {
    cursor: pointer;  
  }
</style>
