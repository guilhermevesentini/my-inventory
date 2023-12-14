<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item>
      <p>iNVENTORY</p>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title>settings</template>
      <el-menu-item index="2-1">Configurar Conta</el-menu-item>
      <el-menu-item index="2-2">Personalizar</el-menu-item>
      <el-menu-item index="2-3" @click="logout">Sair</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import router from '@/router';
import { clearLocalStorage } from '@/utils';

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push({ path: `/` });
}

const logout = (() => {
  clearLocalStorage()
  router.push({ path: `/login` });
})

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>