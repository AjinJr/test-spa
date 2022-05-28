<template>
  <div
    class="w-3/4 sm:w-2/3 border rounded-md shadow-xl min-w-fit min-h-fit aling-center sm:align-start p"
  >
    <Buttons @toggle="toggle" :value="value" />
    <Converter v-if="value == 0" />
    <HistCur v-else />
  </div>
</template>

<script>
import Buttons from "@/components/converterPage/Btns.vue";
import Converter from "@/components/converterPage/Converter.vue";
import HistCur from "@/components/converterPage/HistCur.vue";

export default {
  data() {
    return {
      value: 0,
    };
  },
  name: "MainBox",
  components: {
    Buttons,
    Converter,
    HistCur,
  },
  methods: {
    toggle(v) {
      if (this.value == v) {
        return;
      } else if (this.value == 0) this.value = 1;
      else this.value = 0;
      //   if (this.value == 0) this.value = 1;
      //   else this.value = 0;
    },
  },
};
</script>
