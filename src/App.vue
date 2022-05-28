<template>
  <button class="hamburger sm:hidden absolute z-30" @click="toggle">
    <i v-if="!isShown" class="fa-solid fa-bars text-3xl flex"></i>
    <i v-else class="fa-solid fa-xmark text-3xl"></i>
  </button>
  <nav class="sm:flex justify-between sm:justify-center hidden gap-x-40">
    <router-link to="/"
      ><i class="fa-solid fa-money-bill-transfer text-4xl"></i
    ></router-link>
    <router-link to="/user" class=""
      ><i class="fa-solid fa-user text-3xl"></i
    ></router-link>
  </nav>
  <div v-if="isShown" class="menu z-20 rounded-md bg-white border border-black">
    <div class="flex flex-col gap-y-4">
      <router-link class="text-lg font-semibold" @click="toggle" to="/"
        >Converter</router-link
      >
      <router-link class="text-lg font-semibold" @click="toggle" to="/user"
        >Portfolio</router-link
      >
    </div>
  </div>
  <div
    v-if="isShown"
    class="absolute w-screen h-screen z-10 top-0 left-0 right-0"
    :class="{ 'bg-black/[.5]': isShown }"
  ></div>
  <router-view class="pt-16" :class="{ blur: isShown }" />
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
      width: null,
    };
  },
  methods: {
    toggle() {
      console.log(1);
      this.isShown = !this.isShown;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
  watch: {
    width: function () {
      this.width >= 640 ? (this.isShown = false) : false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding-top: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #1b18e1;
}

.hamburger {
  top: 5px;
  right: 17px;
}
.menu {
  position: fixed;
  top: 0;
  right: 0;
  padding: 50px;

  /* background: #ededed; */
}
</style>
