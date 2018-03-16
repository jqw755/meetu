<template>
  <div id="app">
    <Loading v-show="showLoading"></Loading>
    <Notice :noticeOptions="noticeOptions"></Notice>
    <Toast :toastOptions="toastOptions"></Toast>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--app footer-->
    <div class="global-footer">
      <mu-paper>
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <mu-bottom-nav-item value="dynamics" title="动态" icon="home"/>
          <mu-bottom-nav-item value="message" title="信息" icon="message"/>
          <mu-bottom-nav-item value="message" title="" icon="add"/>
          <mu-bottom-nav-item value="me" title="自己" icon="own"/>
        </mu-bottom-nav>
      </mu-paper>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  //  loading
  import Loading from './view/loading/loading.vue'
  import Notice from './view/notice/notice.vue'
  import Toast from './view/notice/toast.vue'

  export default {
    name: 'app',
    data () {
      return {
        bottomNav: 'recents'
      }
    },
    components: {
      Loading, Notice, Toast
    },
    methods: {
      //...mapActions([
      //  'showNotice',
      //  'showToast',
      //  'setTitle'
      //]),

      // 切换底部导航
      handleChange (val) {
        this.bottomNav = val
      }
    },
    computed: {
      ...mapState([
        'showLoading',
        'noticeOptions',
        'toastOptions'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    padding-bottom: 5.6rem;
  }

  .global-footer {
    width: 100%;
    height: 5.6rem;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
