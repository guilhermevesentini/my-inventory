<template>
    <div class="main-content">
        <router-view />
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.main-content {
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
    width: auto;
    overflow: hidden;
    overflow-x: hidden;
    min-height: calc(100% - 40px);
}

@media (min-width: 1200px) {
    .main-content {
        overflow-y: auto;
    }
}
</style>