<template>
	<div id="index">
		<Header></Header>
		<div class="article_list">
			<ul>
				<li v-for="i in list" :key="i.id">
					<router-link :to="'/content/' + i.id" :id="i.id">
						{{ i.value }}
					</router-link>
				</li>
			</ul>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      list: [
        {
          id: "js",
          value: "js"
        },
        {
          id: "css",
          value: "css"
        },
        {
          id: "html",
          value: "html"
        },
        {
          id: "css3",
          value: "css3"
        },
        {
          id: "html5",
          value: "html5"
        },
        {
          id: "jquery",
          value: "jquery"
        },
        {
          id: "bootstrap",
          value: "bootstrap"
        },
        {
          id: "avalon",
          value: "avalon"
        },
        {
          id: "vue",
          value: "vue"
        }
      ]
    };
  },
  created() {
    this.$http.get("/api/name").then(response => {
      response = response.body;
      if (response.errno === 0) {
        console.log(response.data);
      }
    });
  },
  methods: {}
};
</script>
