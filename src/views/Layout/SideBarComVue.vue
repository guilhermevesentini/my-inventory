<template>
    <div class="sidebar">
        <ul class="sidebar-menu-container">            
            <li>          
                <a href="/" class="logo">
                    iNVENTORY
                </a>                
            </li>               
            <li class="item">
                <router-link to="/dashboard">
                    <a href="#"><i class="material-icons">dashboard</i>Dashboard</a>
                </router-link>
            </li>
            <li class="item" @click="toggleDashboardMenu">
                <i class="material-icons" title="eye">{{ showDashboardMenu ? 'expand_less' : 'expand_more' }}</i>
                <a>Inventory</a>
            </li>
        </ul>
        <ul class="item collapse" id="dashboardCollapsedMenu"  v-if="showDashboardMenu">
            <li>
                <router-link to="/inventory">
                    <a href="#"><i class="material-icons">inventory_2</i>Inventory</a>
                </router-link>
            </li>
        </ul>
        <ul class="item collapse" id="dashboardCollapsedMenu"  v-if="showDashboardMenu">            
            <li>
                <router-link to="/inventory_config">
                    <a href="#"><i class="material-icons">settings</i>Config</a>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="sidebar">
        
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    setup() {
        const showDashboardMenu = ref(false);

        function toggleDashboardMenu(): void {
            showDashboardMenu.value = !showDashboardMenu.value;
        }

        // Função para fechar o menu de colapso ao clicar fora da lista
        function closeDashboardMenu(event: Event) {
            if (showDashboardMenu.value) {
                const target = event.target as HTMLElement;
                const sidebar = document.querySelector('.sidebar') as HTMLElement;

                if (!sidebar.contains(target)) {
                    showDashboardMenu.value = false;
                }
            }
        }

        // Adiciona o ouvinte de evento quando o componente é montado
        onMounted(() => {
            document.addEventListener('click', closeDashboardMenu);
        });

        return {
            showDashboardMenu,
            toggleDashboardMenu,
        };
    },
});
</script>
  

<style lang="scss" scoped>
.sidebar {
    height: 100%;
    min-width: 160px;
    box-shadow: 4px 0px 4px -3px rgba(0, 0, 0, 0.37);
    -webkit-box-shadow: 4px 0px 10px -3px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: 4px 0px 4px -3px rgba(0, 0, 0, 0.37);

    .logo {
        display: flex;
        align-items: center;
        padding: 15px;
        min-height: 55px;
        background-color: #0067ff;
        color: #fff;
        border-bottom: 1ps solid gray;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
        -webkit-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
        -moz-box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.37);
        border-right: 0.5px solid rgba(128, 128, 128, 0.281);
    }

    .sidebar-menu-container {
        list-style: none;
        padding-left: 0rem;
    }

    .item {
        font-size: 16px;
        display: flex;
        flex-direction: row;
        padding: 10px;
        margin: 5px 5px;
        border-radius: 10px;
        list-style: none;
        cursor: pointer;
    }

    .collapse {
        margin-left: 1.5em;
    }

    .item:hover {
        background-color: #6b6b6b;
        color: #fff;
    }

    i {
        margin-right: 10px;
        font-size: 22px;
    }

    a {
        color: unset;
        text-decoration: none;
        display: flex;
    }
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

        ul {
            display: flex;
        }

        ul li {
            padding: 0.5rem;
        }
    }
}</style>