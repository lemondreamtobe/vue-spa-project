<template>
  <div id="app">
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>
<script>
import Footer from "./components/footer.vue";
export default {
   components: {
    Footer,
  },
  name: 'app'
}
</script>

<style lang="scss">
  @import "./style/style";
</style>