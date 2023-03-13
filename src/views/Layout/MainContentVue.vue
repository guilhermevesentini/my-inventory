<template>
    <main>
        <div class="row">
            <div class="col-sm-12 col-md-2">
                <SideBarComVueVue />
            </div>
            <div class="col-sm-12 col-md-10">
                <div class="main-content">
                    <router-view />
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import SideBarComVueVue from '@/views/Layout/SideBarComVue.vue';
</script>

<style scoped>
main {
    overflow: auto;
    overflow-x: hidden;
    height: 100%;
}

.main-content {
    height: 85vh;
    overflow: auto;
}

@media (max-width: 776px) {
    .main-content {
        padding: 0 1rem;
        text-align: center;
    }

    .sidebar {
        display: flex;
        color: #fff;
        flex-wrap: nowrap;
        align-content: center;
        align-items: flex-start;
        justify-content: center;
        padding: 0 1rem;
        max-height: 100vh;
    }

    .sidebar ul {
        display: flex;
    }

    #my-chart-id {
        height: 350px !important;
        padding: 31px;
    }
}
</style>