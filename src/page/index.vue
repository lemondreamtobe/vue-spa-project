<template>
	<div id="index">
     <Header></Header>
    <div id="content">
      <div class="left-menu">
        <Menu></Menu>
      </div>
      <div class="right-content">
          <router-view></router-view>
      </div>
    </div>
	</div>
</template>
<script>
	import Header from "../components/header.vue";
  import Menu from "../components/menu.vue";
	export default {
		components: {
			Header,
			Menu
		},
		data() {
      return {}
      },
		created() {
		
		},
		methods: {
			
		}
	};

</script>

