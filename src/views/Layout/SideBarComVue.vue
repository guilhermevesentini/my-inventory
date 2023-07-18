<template>
    <div class="sidebar">        
        <ul>            
            <li>
                <div class="logo">
                    iNVENTORY
                </div>
            </li>
            <li>
                <router-link to="/dashboard" v-slot="{ navigate }">
                    <a @click="navigate"><i class="material-icons">dashboard</i>Dashboard</a>
                </router-link>                
            </li>
            <li>
                <router-link to="/inventory" v-slot="{ navigate }">
                <a @click="navigate"><i class="material-icons">inventory_2</i>Inventory</a>
            </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.sidebar {    
    height: 100%;
    min-width: 160px;
    box-shadow: 4px 0px 4px -3px rgba(0, 0, 0, 0.37);
    -webkit-box-shadow: 4px 0px 10px -3px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: 4px 0px 4px -3px rgba(0, 0, 0, 0.37);
}
.sidebar .logo {
    display: flex;
    align-items: center;
    padding: 15px;
    min-height: 55px;
    border-bottom: 1ps solid gray;
    box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
    -webkit-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
    border-right: 0.5px solid rgba(128, 128, 128, 0.281);
}
.sidebar ul {
    list-style: none;
    padding-left: 0rem;
}

.sidebar ul li:not(:first-child) {
    font-size: 16px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 5px 5px;
    border-radius: 10px;
}

.sidebar ul li i {
    margin-right: 10px; 
    font-size: 22px;
}

.sidebar ul a {
    color: unset;
    text-decoration: none;
    display: flex;
}
.sidebar ul li:not(:first-child):hover {
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
    }
}

@media (max-width: 768px) {
    .sidebar {
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