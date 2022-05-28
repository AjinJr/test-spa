<template>
  <div>
    <div class="text-lg">{{ amount }} {{ firstSelect }} =</div>
    <div class="text-xl font-semibold">{{ convertion }} {{ secondSelect }}</div>
  </div>
  <div class="text-sm text-gray-500 flex flex-col justify-center pt-2">
    <div>
      1 {{ firstSelect }} = {{ convertion / amount }} {{ secondSelect }}
    </div>
    <div>1 {{ secondSelect }} = {{ reverseV }} {{ firstSelect }}</div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: {
    firstSelect: {
      type: String,
      default: "",
    },
    secondSelect: {
      type: String,
      default: "",
    },
    reverseV: {
      type: Number,
      default: "",
    },
    convertion: {
      type: Number,
      default: "",
    },
    amount: {
      type: Number,
      default: "",
    },
  },
};
</script>
