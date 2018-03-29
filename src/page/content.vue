<template>
  <div id="content">
    <h2>{{$route.params.id}}</h2>
  </div>
</template>
<script>
import myHeader from "../components/header.vue";
import myFooter from "../components/footer.vue";
export default {
  components: { myHeader, myFooter },
  data() {
    return {
      id: this.$route.params.id,
      dat: {}
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    document.getElementById("content").scrollIntoView();
  },
  methods: {
    getData() {}
  }
};
</script>