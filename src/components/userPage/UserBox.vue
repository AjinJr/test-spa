<template>
  <div
    class="flex flex-col items-center sm:flex-row w-full justify-center sm:w-full gap-x-40 max-h-fit pb-8"
  >
    <div class="w-3/4 sm:w-1/3">
      <UserCoins
        :firstAmount="firstAmount"
        :secondAmount="secondAmount"
        :thirdAmount="thirdAmount"
        @getUserValue="getUserValue"
      />
    </div>

    <div class="w-1/4">
      <UserValueChanger @buyOrSell="buyOrSell" />
    </div>
  </div>

  <div class="w-3/4 sm:w-2/4 border-2 rounded-md p-4 shadow-md">
    <div v-if="loading">Loading...</div>
    <BarChart v-else :values="procV" />
  </div>
  <div class="font-bold text-2xl pt-8">
    <p>Value of your cryptocurrency portfolio:</p>
    <p>{{ value + "$" }}</p>
  </div>
</template>

<script>
import UserCoins from "@/components/userPage/UserCoins.vue";
import UserValueChanger from "@/components/userPage/UserValueChanger.vue";
import BarChart from "@/components/userPage/BarChart.vue";
export default {
  name: "UserBox",
  data() {
    return {
      value: "",
      procV: [],
      loading: true,
      isShown: true,
      firstAmount: 4,
      secondAmount: 3,
      thirdAmount: 400,
      interval: null,
    };
  },
  components: { UserCoins, BarChart, UserValueChanger },
  methods: {
    updateData(payload) {
      this.value = (payload[0] + payload[1] + payload[2]).toFixed(2);
      this.procV = payload.map((element) => {
        return (element / this.value) * 100;
      });
      this.loading = false;
    },
    getUserValue(payload) {
      this.loading = true;
      this.updateData(payload);
    },
    buyOrSell(payload) {
      if (payload.coin === "BTC") {
        if (payload.action == "buy") {
          this.firstAmount += Number(payload.amount);
        } else {
          this.firstAmount -= Number(payload.amount);
        }
      } else if (payload.coin === "ETH") {
        if (payload.action == "buy") {
          this.secondAmount += Number(payload.amount);
        } else {
          this.secondAmount -= Number(payload.amount);
        }
      } else {
        if (payload.action == "buy") {
          this.thirdAmount += Number(payload.amount);
        } else {
          this.thirdAmount -= Number(payload.amount);
        }
      }
    },
  },
  watch: {
    firstAmount: {
      handler: function () {
        if (this.firstAmount < 0) this.firstAmount = 0;
      },
    },
    secondAmount: {
      handler: function () {
        if (this.secondAmount < 0) this.secondAmount = 0;
      },
    },
    thirdAmount: {
      handler: function () {
        if (this.thirdAmount < 0) this.thirdAmount = 0;
      },
    },
  },
};
</script>
