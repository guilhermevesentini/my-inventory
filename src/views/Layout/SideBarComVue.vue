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
    padding: 0.5rem;
    height: 100%;
    min-width: 160px;
}
.sidebar_header {
    padding: 0.5rem 0;
}
.divider {
    position: absolute;
    height: 1px;
    color: gray;;
    width: 100%;
}
.sidebar ul {
    list-style: none;
    padding-left: 0rem;
}

.sidebar ul li {
    padding: 20px 0;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 10px;
}

.sidebar ul li i {
    margin-right: 10px; 
    font-size: 22px;
}

.sidebar ul a {
    color: unset;
    text-decoration: none;
}
.sidebar ul li:hover {
    background-color: #6b6b6b;
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
        padding: 0.5rem;
    }
}
</style>