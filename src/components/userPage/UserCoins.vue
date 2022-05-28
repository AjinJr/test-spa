<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Currency</th>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3 text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800">
          <th
            scope="row"
            class="px-6 py-4 flex font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            <i class="fa-brands fa-btc text-sm pr-2"></i>
            <p>{{ firstCoin }}</p>
          </th>
          <td class="px-6 py-4">{{ firstAmount }}</td>
          <td class="px-6 py-4 text-right">
            {{ convertion[0].toFixed(2) + "$" }}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800">
          <th
            scope="row"
            class="px-6 py-4 flex font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            <i class="fa-brands pr-2 text-sm fa-ethereum"></i>
            <p>{{ secondCoin }}</p>
          </th>
          <td class="px-6 py-4">{{ secondAmount }}</td>
          <td class="px-6 py-4 text-right">
            {{ convertion[1].toFixed(2) + "$" }}
          </td>
        </tr>
        <tr class="bg-white dark:bg-gray-800">
          <th
            scope="row"
            class="px-6 py-4 flex font-medium text-gray-900 whitespace-nowrap"
          >
            <i class="fa-solid fa-dollar-sign pr-2 text-sm"></i>
            <p>{{ thirdCoin }}</p>
          </th>
          <td class="px-6 py-4">{{ thirdAmount }}</td>
          <td class="px-6 py-4 text-right">{{ thirdAmount * 1 + "$" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserButtons from "@/components/userPage/UserButtons.vue";
import UserValueChanger from "@/components/userPage/UserValueChanger.vue";
export default {
  name: "UserCoins",
  data() {
    return {
      firstCoin: "BTC",
      secondCoin: "ETH",
      thirdCoin: "USD",
      //   firstAmount: 4,
      //   secondAmount: 3,
      //   thirdAmount: 400,
      isShown: false,
    };
  },
  components: { UserButtons, UserValueChanger },
  props: {
    firstAmount: {
      type: Number,
      default: 0,
    },
    secondAmount: {
      type: Number,
      default: 0,
    },
    thirdAmount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      convertion: function (state) {
        return [
          this.firstAmount * state.cryptCurr[0],
          this.secondAmount * state.cryptCurr[1],
        ];
      },
    }),
    userValue: function () {
      return [this.convertion[0], this.convertion[1], this.thirdAmount];
    },
  },
  methods: {
    async updateData() {
      await this.$store.dispatch("getCurr", [
        this.firstCoin,
        this.secondCoin,
        this.thirdCoin,
      ]);
      this.$emit("getUserValue", this.userValue);
    },
  },
  async mounted() {
    // await this.$store.dispatch("getCurr", [
    //   this.firstCoin,
    //   this.secondCoin,
    //   this.thirdCoin,
    // ]);
    // this.$emit("getUserValue", this.userValue);
    await this.updateData();
    this.interval = setInterval(this.updateData, 13000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
