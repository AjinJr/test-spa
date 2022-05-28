<template>
  <div class="flex flex-col sm:flex-row p-4 w-full">
    <div class="flex flex-col sm:flex-row sm:justify-center w-full">
      <MySelect
        :id="'firstSelect'"
        :value="firstSelect"
        @changeSelectValue="changeSelectValue"
      />
      <div class="self-center p-8 text-2xl">
        <i
          @click="reverseSelects"
          class="fa-solid fa-arrow-right-arrow-left cursor-pointer hover:text-gray-400"
        ></i>
      </div>
      <MySelect
        :id="'secondSelect'"
        :value="secondSelect"
        @changeSelectValue="changeSelectValue"
      />
    </div>
  </div>
  <button
    @click="isShown = true"
    class="p-2 pl-6 pr-6 mb-2 border rounded-md bg-blue-600 hover:bg-blue-400 text-white"
  >
    View Chart
  </button>
  <Graph
    class="max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
    v-if="isShown"
    :curDates="curDates"
    :firstSelect="firstSelect"
    :histV="histV"
  />
</template>

<script>
import MySelect from "../UI/MySelect.vue";
import Graph from "@/components/converterPage/Graph.vue";
import { mapState } from "vuex";
export default {
  name: "HistCur",
  components: { MySelect, Graph },
  data() {
    return {
      firstSelect: "USD",
      secondSelect: "BTC",
      isShown: false,
      dates: [],
      curDates: [],
    };
  },
  computed: {
    ...mapState({
      histV: (state) => state.histValues,
    }),
  },
  methods: {
    getHist() {
      const dates = [];
      const date = new Date();
      let yesterday = new Date(date);
      for (let i = 0; i < 14; ++i) {
        yesterday.setDate(yesterday.getDate() - i);
        this.curDates.push(yesterday.toISOString().slice(5, 10));
        let toTimestamp = Date.parse(yesterday);
        dates.push(toTimestamp);
        yesterday = new Date(date);
      }
      console.log(this.curDates);
      return dates.reverse();
    },
    changeSelectValue(obj) {
      if (obj.target === "firstSelect") this.firstSelect = obj.value;
      else this.secondSelect = obj.value;
      if (this.isShown == true) this.isShown = false;
      let payload = {
        from: this.firstSelect,
        to: this.secondSelect,
        dates: this.dates,
      };
      this.$store.dispatch("getHist", payload);
    },
    reverseSelects() {
      if (this.isShown == true) this.isShown = false;
      const transit = this.firstSelect;
      this.firstSelect = this.secondSelect;
      this.secondSelect = transit;

      let payload = { from: this.firstSelect, to: this.secondSelect };
      this.$store.dispatch("getCoin", payload);
    },
  },
  created() {
    this.dates = this.getHist();
    let payload = {
      from: this.firstSelect,
      to: this.secondSelect,
      dates: this.dates,
    };
    this.$store.dispatch("getHist", payload);
  },
};
</script>
