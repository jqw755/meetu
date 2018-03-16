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
          <mu-bottom-nav-item value="recents" title="Recents" icon="restore"/>
          <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>
          <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>
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
