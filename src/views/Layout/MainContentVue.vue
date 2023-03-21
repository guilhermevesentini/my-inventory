<template>
    <main>
        <div class="main-content">
            <router-view />
        </div>
    </main>    
</template>

<script lang="ts" setup>

</script>

<style scoped>
.main-content {
    margin: 0 20px;
    overflow-y: auto;
    height: 85vh;
}

@media (max-width: 776px) {
    .main-content {
        margin-left: 0;
    }
}
</style>