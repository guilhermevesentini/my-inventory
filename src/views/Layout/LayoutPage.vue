<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderCompVue />
      </el-header>
      <el-container class="full-height-aside">
        <el-aside width="200px">
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
.el-header {
  --el-header-padding: 0 0px;
}
.el-main {
  --el-main-padding: 0px;
  background-color: #e6e6e6;
  overflow-y: hidden;
  height: 91.5vh;
}
.full-height-aside {
  height: 100%; /* Define a altura do el-aside para ocupar toda a altura do el-container pai */
}
</style>