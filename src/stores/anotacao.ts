import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export interface ChartData {
    labels: string[];
    datasets: {
        label?: string;
        backgroundColor?: string;
        data: number[];
    }[];
};

export const useAnotacaoStore = defineStore('anotacao', () => {
    const data = ref();
    const chartData = ref<ChartData>();
    const erro = ref();

    function generateChartData(data:any):ChartData {
        var chartLabels: string[] = [];
        var chartDatasets: any[] = [];
      
        chartLabels = data.map((x:any) => x.usuario);
        chartDatasets = data.map((x:any) => x.quantidadeAnotacao);
        return {
              labels: chartLabels,
              datasets: [ { label: 'Anotações', backgroundColor: '#007979',data: chartDatasets } ]
            };
    }
    async function getChartData() {
        try {
            const res = await axios.get("anotacao/quantidadePorUsuario");
            data.value = res.data;
            chartData.value = generateChartData(res.data);
        }
        catch (ex) {
            erro.value = (ex as Error).message;
            console.log(erro);
        }
    }

    return { data, chartData, getChartData }
})