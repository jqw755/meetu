<template>
  <section class="chat-wrap">
    <!--<mobile-tear-sheet>-->
    <mu-list >
      <mu-sub-header>今天</mu-sub-header>
      <mu-list-item title="这个周末一起吃饭么?" :to="`/chatting?id=${to}`">
        <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
        <span slot="describe">
          <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span>
          <span>周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈</span>
      </span>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="回复"/>
          <mu-menu-item title="标记"/>
          <mu-menu-item title="删除"/>
        </mu-icon-menu>
      </mu-list-item>
      <mu-divider inset/>
    </mu-list>
    <!--</mobile-tear-sheet>-->

    <!--footer-->
    <globalFooter :changeBottomNav="bottomNav"></globalFooter>
  </section>
</template>


<script>
  import globalFooter from '../layout/footer'

  export default {
    data() {
      return {
        bottomNav: 'message',
        me: '', // 自己
        to: 'robot', // 要聊天的用户
      }
    },
    mounted() {
      const self = this;

    },
    components: {
      globalFooter
    }
  }
</script>

<style lang="scss" scoped>
  .chat-wrap{
    padding-bottom: 5.6rem;
  }
</style>
