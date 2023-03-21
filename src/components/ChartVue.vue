<template>
    <div>
        <div ref="ChartVue"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ApexCharts from 'apexcharts';

export default defineComponent({
    name: 'ChartVue',
    props: {
        options: {
            type: Object,
            required: true
        },
        series: {
            type: Array,
            required: true
        }
    },
    mounted() {
        const chart = new ApexCharts(this.$refs.chart, {
            ...this.options,
            series: this.series
        });
        chart.render();
    }
});
</script>
  