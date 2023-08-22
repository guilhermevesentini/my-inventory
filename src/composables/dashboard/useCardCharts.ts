import type { ETypeChart } from './types';
import type { ApexOptions } from 'apexcharts';
import { ref } from 'vue';

export default function useCustomChart(chartType: ETypeChart) {
  const initialTypeChart = ref<ETypeChart>(chartType);
  const chartOptions = ref<ApexOptions>({});
  const series: any = ref([]);

  const handleSetPropsChart = async (options?: ApexOptions, seriesOpt?: any) => {
    const hasConfig = options && seriesOpt;
    if (hasConfig) {
      chartOptions.value = options;
      series.value = seriesOpt;

      return;
    }
  };

  const handleChangeTypeChart = (value: ETypeChart) => {
    initialTypeChart.value = value;
    handleSetPropsChart();
  };

  const isCurrentType = (type: ETypeChart) => {
    const isSelected = type === initialTypeChart.value
      ? 'primary'
      : 'default';

    return isSelected;
  };

  return {
    chartOptions,
    series,
    initialTypeChart,
    handleSetPropsChart,
    handleChangeTypeChart,
    isCurrentType,
  };
}
