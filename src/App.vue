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
</style>
