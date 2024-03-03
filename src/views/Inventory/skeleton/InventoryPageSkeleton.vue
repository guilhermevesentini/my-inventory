<template>
    <div>
        <el-skeleton loading animated class="inventario-page-skeleton">
            <template #template>
                <el-skeleton-item variant="rect" class="item item-header" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item" />

                <el-skeleton-item variant="rect" class="item item-footer" />
            </template>
        </el-skeleton>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.inventario-page-skeleton {
    width: 100%;
    height: 100%;

    .item {
        height: 30px;

        &.item-header {
            height: 50px;
            margin-bottom: 2em;
        }
        &.item-footer {
            width: 20%;
            margin-top: 1em;
            height: 20px;
        }
    }
}
</style>