<template>
    <div class="sidebar">
        <ul>
            <router-link to="/dashboard" v-slot="{ navigate }">
                <li @click="navigate"><i class="material-icons">dashboard</i>Dashboard</li>
            </router-link>
            <router-link to="/inventory" v-slot="{ navigate }">
                <li @click="navigate"><i class="material-icons">inventory_2</i>Inventory</li>
            </router-link>
        </ul>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.sidebar {
    color: #fff;
    background-color: #1a1a1a;
    padding: 20px;
    height: 100vh;
    min-width: 160px;
}

.sidebar ul {
    list-style: none;
    padding-left: 0rem;
}

.sidebar ul li {
    padding: 20px 0;
    font-size: 18px;
    display: flex;
    flex-direction: row;
}

.sidebar ul li i {
    margin-right: 10px;
}

.sidebar ul a {
    color: #fff;
    text-decoration: none;
}

@media (max-width: 776px) {
    .sidebar {
        display: flex;
        color: #fff;
        flex-wrap: nowrap;
        align-content: center;
        align-items: flex-start;
        justify-content: center;
        height: 88px;
    }
}

@media (max-width: 768px) {
    .sidebar {
        
        height: 88px;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: stretch;
        align-items: center;
        justify-content: center;
    }

    .sidebar ul {
        display: flex;
    }

    .sidebar ul li {
        padding: 10px;
    }
}
</style>