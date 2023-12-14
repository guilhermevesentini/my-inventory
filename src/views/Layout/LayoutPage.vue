<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-header>
        <HeaderCompVue />
      </el-header>
      <el-container>
        <el-aside width="200px" class="full-height-aside">
          <SideBarComVueVue />
        </el-aside>
        <el-container>
          <el-main>
            <MainContentVue />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SideBarComVueVue from "./SideBarComVue.vue";
import MainContentVue from "./MainContentVue.vue";
import HeaderCompVue from "./HeaderCompVue.vue";

</script>

<style lang="scss">
.el-main {
  --el-main-padding: 0px;
}
.full-height-aside {
  height: 100%; /* Define a altura do el-aside para ocupar toda a altura do el-container pai */
}
</style>