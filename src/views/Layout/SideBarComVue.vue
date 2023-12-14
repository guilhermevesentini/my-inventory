<template>
    <el-row class="full-height">
        <el-col :span="24">
            <el-menu default-active="2" class="full-height-menu" @open="handleOpen" @close="handleClose">
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


const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const ClickNoLink = (path: string) => {
    return router.push(`${path}`)
}

</script>
  

<style lang="scss" scoped>.full-height {
    height: 100%;
    /* Define altura para ocupar toda a altura do seu contêiner pai */
}

.full-height-menu {
    height: 100%;
    /* Define altura para ocupar toda a altura do menu */
}</style>