<template>
  <div class="index-container">
    <!-- 上拉刷新 -->
    <!--<mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->

    <div class="article-wrap">
      <div class="article-card" v-for="(article, index) in articles" :key="index">
        <mu-card>
          <mu-card-header title="我的名字" :subTitle="article.date">
            <mu-avatar src="../../assets/public/me.png" slot="avatar"/>
          </mu-card-header>
          <mu-card-media v-if="article.image">
            <img src="/src/assets/public/article-img.png"/>
          </mu-card-media>
          <router-link :to="`/detail/${article._id}`">
            <mu-card-title :title="article.title" v-if="article.title"/>
            <mu-card-text>{{article.content}}</mu-card-text>
          </router-link>
          <mu-card-actions>
            <mu-icon value="favorite_border" color="gray"/>
            <mu-icon-button :href="`/detail/${article._id}`" icon="drafts"/>
            <mu-icon-button icon="star_border"/>
            <mu-icon-button icon="share"/>
          </mu-card-actions>
        </mu-card>
      </div>
    </div>
    <!-- 向下拉加载更多 -->
    <!--<mu-infinite-scroll :scroller="scroll" :loading="loading" @load="loadMore"/>-->
    <!-- footer -->
    <globalFooter :changeBottomNav="bottomNav"></globalFooter>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import globalFooter from '../layout/footer'

  export default {
    data() {
      return {
        bottomNav: 'dynamics',
        articles: {},
        loading: false,
        scroll: null,
        refreshing: false,
        trigger: null
      }
    },
    mounted() {
      const self = this;
      self.getIndexData(1, 10);
      //  挂载加载实例
      this.trigger = this.$el;
      this.scroll = this.$el;
      self.setTitle('meetu');
      // console.log(this.scroll)
    },
    methods: {
      ...mapActions([
        'setUser',
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      getIndexData(pageNum, pageSize) {
        const self = this;
        self.$api.get('/api/getArticles', {'pagenum': pageNum, 'pagesize': pageSize}, true).then((res) => {
          const data = res.data;
          if (!data.code > 0) {
            self.toastOpt.message = data.msg;
            self.showToast(self.toastOpt);
          } else {
            if (data.code === 1) {
              this.articles = data.result;
            }
          }
        }).catch(e => {
          let options = {
            isShow: true,
            message: e.msg || '数据获取出错,请重试',
            noCancel: true,
          };
          self.showNotice(options);
        })
      },
      loadMore() {
        const self = this;
        self.loading = true;
        self.getIndexData(2, 10);
        self.loading = false
      },
      refresh() {
        const self = this;
        self.refreshing = true;
        self.getIndexData(1, 10);
        self.refreshing = false;
      }

    },
    components: {
      globalFooter
    }
  }
</script>

<style lang="scss" scoped>
  .index-container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }

  .article-card {
    margin-bottom: 1.5rem;
  }
</style>


