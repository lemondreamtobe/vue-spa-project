<template>
  <header class="header">
    <div class="logo">
      <a class="logo-img"><img src="../../static/img/logo.png"></a>
      <a class="logo-title" href="/" title="回到登录页">开支记录后台管理系统</a>
      <a class="logo-user">用户:{{user}}</a>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      user: "admin"
    };
  }
};
</script>
