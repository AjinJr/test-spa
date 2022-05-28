<template>
  <div class="flex justify-between">
    <button
      @click.stop="toggle(0)"
      class="w-1/2 p-4 flex justify-center gap-x-2 min-w-fit text-lg"
      :class="{ 'bg-gray-400': value == 1 }"
    >
      <i class="fa-solid fa-coins text-gray-700 text-lg"></i>
      <p>converter</p>
    </button>
    <button
      @click.stop="toggle(1)"
      class="w-1/2 p-4 flex justify-center gap-x-2 min-w-fit text-lg"
      :class="{ 'bg-gray-400': value == 0 }"
    >
      <i class="fa-solid fa-chart-line text-gray-700 text-lg"></i>
      <p>charts</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    toggle(value) {
      this.$emit("toggle", value);
    },
  },
};
</script>
