<template>
	<div id="index">
		<Header></Header>
    <transition name="slide-fade">
      <div class="article_list" v-if="show">
        <ul>
          <li v-for="i in list" :key="i.id" class="list-complete-item">
            <router-link :to="'/content/' + i.id" :id="i.id">
              {{ i.value }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
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
      show: false,
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
    let _self = this;
    this.$http.get("/api/name").then(response => {
      response = response.body;
      if (response.errno === 0) {
        console.log(response.data);
      }
    });
    setTimeout(function() {
      _self.show = true;
    }, 500);
  },
  methods: {
    shuffle: function() {
      this.list = _.shuffle(this.list);
    }
  }
};
</script>
