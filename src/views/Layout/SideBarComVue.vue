<template>
    <div class="sidebar">
        <ul>
            <router-link to="/dashboard" v-slot="{ navigate }">
                <li @click="navigate"><i class="material-icons">dashboard</i></li>
            </router-link>
            <router-link to="/inventory" v-slot="{ navigate }">
                <li @click="navigate"><i class="material-icons">inventory_2</i></li>
            </router-link>
        </ul>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.sidebar {
    text-align: center;
    color: #fff;
    padding: 0 0 0 25%;
}

.sidebar ul {
    background-color: #1a1a1a;
    border-radius: 10%;
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 20px;
}

.sidebar ul a {
    color: #fff;
}

@media (max-width: 776px) {
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
}

</style>