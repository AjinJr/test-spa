<template>
  <div class="flex flex-col w-full sm:w-1/3 text-center">
    <label
      v-if="id == 'firstSelect' && isShown"
      class="font-bold"
      for="firstSelect"
      >From</label
    >
    <label
      v-if="id == 'secondSelect' && isShown"
      class="font-bold"
      for="secondSelect"
      >To</label
    >
    <!-- <label else class="font-bold" for="secondSelect">To</label> -->
    <select
      @change="onChange($event)"
      v-model="select"
      :id="id"
      class="p-3 border rounded-md"
    >
      <option :value="select">{{ value }}</option>
      <option v-for="(item, index) in filterArray()" :key="'' + item + index">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  data() {
    return {
      select: 0,
      array: ["USD", "BTC", "ETH"],
    };
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onChange(e) {
      let obj = { target: e.target.id, value: this.select };
      this.$emit("changeSelectValue", obj);
    },
    filterArray() {
      console.log(this.array.filter((item) => item != this.value));
      return this.array.filter((item) => item != this.value);
    },
  },
};
</script>
