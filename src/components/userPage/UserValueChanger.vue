<template>
  <div class="p-4 flex justify-around">
    <div class="flex justify-between">
      <MySelect
        class="pl-2"
        :value="firstSelect"
        :id="'firstSelect'"
        :isShown="false"
        @changeSelectValue="changeSelectValue"
      />
      <input
        name="buyInput"
        type="text"
        class="border rounded-md"
        v-model="buyValue"
        @input.prevent
      />
    </div>
    <button
      @click="changeData('buy')"
      class="p-2 pl-8 pr-8 sm:pl-12 mr-2 sm:pr-12 border rounded-md bg-blue-600 hover:bg-white hover:text-blue-600 text-white"
    >
      Buy
    </button>
  </div>
  <div class="p-2 sm:p-4 flex justify-around">
    <div class="flex">
      <MySelect
        :value="secondSelect"
        :id="'secondSelect'"
        :isShown="false"
        @changeSelectValue="changeSelectValue"
      />
      <input
        name="sellInput"
        type="text"
        v-model="sellValue"
        @input.prevent
        class="border rounded-md"
      />
    </div>
    <button
      @click="changeData('sell')"
      class="p-2 pl-8 pr-8 sm:pl-12 mr sm:pr-12 border rounded-md bg-white text-blue-600 hover:bg-blue-600 hover:text-white text-white"
    >
      Sell
    </button>
  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect.vue";
export default {
  name: "UserValueChanger",
  data() {
    return {
      isShown: false,
      firstSelect: "USD",
      secondSelect: "USD",
      buyValue: null,
      sellValue: null,
    };
  },
  props: {
    amounts: {
      type: Array,
      default: [],
    },
  },
  components: { MySelect },
  methods: {
    changeSelectValue(obj) {
      console.log(obj.target);
      if (obj.target === "firstSelect") this.firstSelect = obj.value;
      else this.secondSelect = obj.value;
    },
    changeData(payload) {
      let data = {};
      if (payload == "buy") {
        data = {
          action: payload,
          amount: this.buyValue,
          coin: this.firstSelect,
        };
      } else {
        data = {
          action: payload,
          amount: this.sellValue,
          coin: this.secondSelect,
        };
      }
      this.$emit("buyOrSell", data);
      if (payload == "buy") this.buyValue = "";
      else this.sellValue = "";
    },
  },
};
</script>
