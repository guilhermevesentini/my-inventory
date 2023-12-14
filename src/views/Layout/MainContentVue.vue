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
    margin: 0.5rem;
    border-radius: 10px;
    background-color: #fff;
    height: calc(100% - 50px);
    width: auto;
    overflow: hidden;
    overflow-x: hidden;
}

@media (min-width: 1200px) {
    .main-content {
        overflow-y: auto;
    }
}
</style>