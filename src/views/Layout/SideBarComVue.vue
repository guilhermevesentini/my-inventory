<template>
    <div class="sidebar">
        <ul class="sidebar-menu-container">            
            <li>          
                <a href="/" class="logo">
                    iNVENTORY
                </a>                
            </li>               
            <li class="item" @click="ClickNoLink('/Dashboard')">
                <i class="material-icons">insights</i>Dashboard
            </li>
            <li class="item" @click="ClickNoLink('/Inventory')">
                <i class="material-icons">list_alt</i>Produtos
            </li>
            <!-- <li class="item" @click="toggleDashboardMenu">
                <i class="material-icons">content_paste</i>                
                <a>Produtos</a>
                <i class="material-icons dropdown_icon" title="eye">{{ showDashboardMenu ? 'expand_less' : 'expand_more' }}</i>
            </li>
            <ul class="item collapse" id="dashboardCollapsedMenu"  v-if="showDashboardMenu">
            <li>
                <router-link to="/inventory">
                    <a href="#"><i class="material-icons">list_alt</i>Produtos</a>
                </router-link>
            </li>
            </ul>
            <ul class="item collapse" id="dashboardCollapsedMenu"  v-if="showDashboardMenu">            
                <li>
                    <router-link to="/inventory_config">
                        <a href="#"><i class="material-icons">settings</i>Config</a>
                    </router-link>
                </li>
            </ul> -->
            <li class="item" @click="ClickNoLink('/Calendario')">
                <i class="material-icons">calendar_month</i>Calendário
            </li>
            <li class="item" @click="ClickNoLink('/Receitas')">
                <i class="material-icons">add</i>Receitas
            </li>
            <li class="item" @click="ClickNoLink('/Despesas')">
                <i class="material-icons">remove</i>Despesas
            </li>
            <li class="item" @click="ClickNoLink('/Orders')">
                <i class="material-icons">shopping_cart</i>Orders
            </li>
            <li class="item" @click="ClickNoLink('/Financeiro')">
                <i class="material-icons">attach_money</i>Financeiro
            </li>
            <li class="item" @click="ClickNoLink('/inventory_config')">
                <i class="material-icons">settings</i>Cadastros
            </li>
        </ul>        
    </div>
</template>
  
<script lang="ts">
import router from '@/router';
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
    methods: {
        ClickNoLink (path: string) {
            return router.push(`${path}`)
        }
    }
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
        padding: 0.8rem;
        min-height: 57px;
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

        .dropdown_icon {
            display: flex;
            align-items: flex-end;
            margin-left: 15px;            
        }
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