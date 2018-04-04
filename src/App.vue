<template>
  <div id="app">
    <Loading v-show="showLoading"></Loading>
    <Notice :noticeOptions="noticeOptions"></Notice>
    <Toast :toastOptions="toastOptions"></Toast>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
</style>
