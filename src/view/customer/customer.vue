<template>
  <section class="customer-wrap">
    <!-- 事件轴 -->
    <mu-timeline>
      <mu-timeline-item>
        <span slot="des">发起第一个pr</span>
        <span slot="time">2017年 6月 1日</span>
      </mu-timeline-item>
    </mu-timeline>

    <!--footer-->
    <globalFooter :changeBottomNav="bottomNav"></globalFooter>
  </section>
</template>

<script>
  import globalFooter from '../layout/footer'

  export default {
    data() {
      return {
        bottomNav: 'person'
      }
    },
    components: {
      globalFooter
    }
  }
</script>

<style lang="scss" scoped>
  .customer-wrap{
    padding-bottom: 5.6rem;
  }
</style>
