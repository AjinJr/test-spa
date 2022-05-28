<template>
  <Line
    :chart-options="options"
    :chart-data="chartData"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend
);
export default {
  name: "LineChart",
  data() {
    return {
      width: 300,
      heigth: 300,
    };
  },
  components: { Line },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {},
};
</script>
