<template>
    <el-row class="full-height">
        <el-col :span="24">
            <el-menu :default-active="activeMenu" class="full-height-menu">
                <el-menu-item index="1" @click="ClickNoLink('/Dashboard')">
                    <el-icon>
                        <DataAnalysis />
                    </el-icon>
                    <span>Dashboard</span>
                </el-menu-item>
                <el-menu-item index="2" @click="ClickNoLink('/Inventory')">
                    <el-icon>
                        <TakeawayBox />
                    </el-icon>
                    <span>Produtos</span>
                </el-menu-item>
                <el-menu-item index="3" @click="ClickNoLink('/Calendario')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>Calendário</span>
                </el-menu-item>
                <el-menu-item index="4" @click="ClickNoLink('/Receitas')">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span>Receitas</span>
                </el-menu-item>
                <el-menu-item index="5" @click="ClickNoLink('/Despesas')">
                    <el-icon>
                        <Minus />
                    </el-icon>
                    <span>Despesas</span>
                </el-menu-item>
                <el-menu-item index="6" @click="ClickNoLink('/Orders')">
                    <el-icon>
                        <Coordinate />
                    </el-icon>
                    <span>Orders</span>
                </el-menu-item>
                <el-menu-item index="7" @click="ClickNoLink('/Financeiro')">
                    <el-icon>
                        <Money />
                    </el-icon>
                    <span>Financeiro</span>
                </el-menu-item>
                <el-menu-item index="8" @click="ClickNoLink('/Cadastros')">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>Cadastros</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import router from '@/router';
import {
    DataAnalysis,
    TakeawayBox,
    Calendar,
    Plus,
    Minus,
    Coordinate,
    Money,
    Setting,
} from '@element-plus/icons-vue'

const routeIndexMapping: { [key: string]: string } = {
  '/Dashboard': '1',
  '/Inventory': '2',
  '/Calendario': '3',
  '/Receitas': '4',
  '/Despesas': '5',
  '/Orders': '6',
  '/Financeiro': '7',
  '/Cadastros': '8',
};

router.afterEach(() => {
  activeMenu = getActiveMenu();
});

const getActiveMenu = (): string => {
  const currentRoute = router.currentRoute.value.path;
  return routeIndexMapping[currentRoute] || '1';
};

let activeMenu = getActiveMenu();

const ClickNoLink = (path: string) => {
    return router.push(`${path}`)
}

</script>
  

<style lang="scss" scoped>
.full-height {
    height: 100%;
    padding: 0;
}

.full-height-menu {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-menu-item:last-child {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
</style>