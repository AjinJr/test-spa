<template>
  <Bar :chart-data="chartData" :chart-options="options" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

Chart.register(
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
import { mapState } from "vuex";
export default {
  name: "BarChart",
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
        },
      },
    };
  },
  components: { Bar },
  computed: {
    ...mapState({
      cryptoProc: (state) => state.histValues,
    }),
    sum: function () {
      return Number(this.values[0] + this.values[1] + this.values[2]).toFixed(
        3
      );
    },
  },
  props: {
    coins: {
      type: Array,
      default: [],
    },
    values: {
      type: Array,
      default: [],
    },
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    chartData: function () {
      let data = {
        labels: ["BTC", "ETH", "USD"],
        datasets: [
          {
            label: 12,
            data: this.values,
          },
        ],
      };
      return data;
    },
  },
  mounted() {
    Chart.register(
      PointElement,
      CategoryScale,
      LinearScale,
      BarElement,
      Tooltip,
      Legend
    );
  },
};
</script>
