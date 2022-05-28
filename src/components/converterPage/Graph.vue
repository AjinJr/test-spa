<template>
  <LineChart :chartData="chartData" :options="options" />
</template>

<script>
import LineChart from "@/components/converterPage/LineChart.vue";
import { mapState } from "vuex";
export default {
  name: "Graph",
  data() {
    return {
      chartData: {
        labels: this.curDates.reverse(),
        datasets: [
          {
            label: this.firstSelect,
            data: this.histV.data,
          },
        ],
      },
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
  components: { LineChart },
  props: {
    curDates: {
      type: Array,
      default: [],
    },
    firstSelect: {
      type: String,
      default: null,
    },
    histV: {
      type: Object,
      default: null,
    },
  },
  created() {
    console.log(this.histV.data);
  },
};
</script>
