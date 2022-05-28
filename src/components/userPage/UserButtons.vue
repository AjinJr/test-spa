<template>
  <button
    class="font-medium text-blue-600 hover:underline pr-2"
    @click="edit($event)"
  >
    intercalate
  </button>
  <button
    class="font-medium text-red-600 hover:underline"
    @click="edit($event)"
  >
    subtract
  </button>
</template>

<script>
export default {
  name: "UserButtons",
  props: {
    coin: {
      type: Number,
      default: null,
    },
  },
  methods: {
    edit(e) {
      let element = e.currenttarget;
      let prev = element.previousSibling();
      console.log(prev);
    },
  },
};
</script>
