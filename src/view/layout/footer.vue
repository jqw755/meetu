<template>
  <!--app footer-->
  <div class="global-footer">
    <mu-paper>
      <mu-bottom-nav :value="changeBottomNav" @change="handleChange">
        <mu-bottom-nav-item value="dynamics" title="动态" icon="home" to="/"/>
        <mu-bottom-nav-item value="send" title="发布" icon="control_point" to="/articleSend"/>
        <mu-bottom-nav-item value="message" title="信息" icon="message" to="/chat"/>
        <mu-bottom-nav-item value="me" title="自己" icon="person" to="login"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  export default {
    props: {
      changeBottomNav: ''
    },
    data(){
      return{
        bottomNav: '',
      }
    },
    methods: {
      // 切换底部导航
      handleChange (val) {
        this.bottomNav = val
      }
    },
  }
</script>

<style scoped>
  .global-footer {
    width: 100%;
    height: 5.6rem;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
