<template>
    <div id="thirdlogin">
        <img src="../../static/img/me1.jpg" class="third-icon qq">
        <img src="../../static/img/me2.jpg" class="third-icon wechat">
        <el-dialog :visible.sync="imgview"></el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {     
        imgview: false,
      };
    },
    created() {

    },
    methods: {
      overShow() {
          this.imgview = true;
      },
      overHide() {
        this.imgview = false;
      }
    },
  };
</script>
<style lang="scss" scoped>
#thirdlogin {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 250px;
  & > .third-icon {
    padding: 8px;
    width: 130px;
    height: 130px;
    line-height: 100%;
    background-color: #fff;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    text-align: center;
     transition: 0.5s all;
  }
  & > .third-icon.qq {
    border-color: #409eff;
  }
  & > .third-icon.wechat {
    border-color: #67c23a;
  }
  & > .third-icon.qq:hover {
      width: 230px;
      height: 230px;
  }
  & > .third-icon.wechat:hover {
     width: 230px;
      height: 230px;
  }
}
</style>
