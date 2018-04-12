<template>
  <section class="customer-wrap">


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
