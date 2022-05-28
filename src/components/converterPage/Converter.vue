<template>
  <div class="p-2">
    <div
      class="container grid grid-rows-1 grid-cols-none gap-x-2 p-4 sm:grid-cols-3 sm:grid-rows-none"
    >
      <div
        class="flex w-2/3 flex-col text-center justify-self-center self-start sm:self-start sm:justify-self-start pb-8"
      >
        <label class="font-bold" for="input">Amount</label>
        <input
          v-model.lazy="amount"
          class="input p-2 border rounded-md"
          type="text"
        />
      </div>
      <div class="flex flex-col sm:flex-row sm:col-span-2">
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
    <div
      class="text-left p-2 flex flex-col sm:flex-row justify-between"
      v-if="isShown"
    >
      <Result
        :firstSelect="firstSelect"
        :secondSelect="secondSelect"
        :amount="Number(amount)"
        :convertion="convertion"
        :reverseV="reverseV"
      />
    </div>
    <button
      @click="isShown = true"
      class="p-2 border rounded-md bg-blue-600 hover:bg-blue-400 text-white"
    >
      Convert
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Result from "@/components/converterPage/Result.vue";
import MySelect from "../UI/MySelect.vue";
export default {
  components: { MySelect, Result },
  name: "Converter",
  data() {
    return {
      firstSelect: "USD",
      secondSelect: "BTC",
      isShown: false,
      amount: 45,
    };
  },
  computed: {
    ...mapState({
      convertion: function (state) {
        return Number((state.value * this.amount).toFixed(9));
      },
      reverseV: function (state) {
        return Number(state.reverseValue.toFixed(9));
      },
    }),
  },
  methods: {
    changeSelectValue(obj) {
      if (obj.target === "firstSelect") this.firstSelect = obj.value;
      else this.secondSelect = obj.value;

      let payload = { from: this.firstSelect, to: this.secondSelect };
      this.$store.dispatch("getCoin", payload);
    },
    reverseSelects() {
      const transit = this.firstSelect;
      this.firstSelect = this.secondSelect;
      this.secondSelect = transit;

      let payload = { from: this.firstSelect, to: this.secondSelect };
      this.$store.dispatch("getCoin", payload);
    },
  },
  mounted() {
    let payload = { from: this.firstSelect, to: this.secondSelect };
    this.$store.dispatch("getCoin", payload);
  },
};
</script>

<style scoped></style>
