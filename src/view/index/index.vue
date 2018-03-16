<template>
  <div class="index-container">
    <section class="article-wrap">
      <div class="article-card" v-for="(article, index) in articles" :key="index">
        <mu-card>
          <mu-card-header title="我的名字" subTitle="发布时间">
            <mu-avatar src="../../assets/public/me.png" slot="avatar"/>
          </mu-card-header>
          <mu-card-media title="图片标题" subTitle="图片描述" v-if="article.image">
            <img src="/src/assets/public/article-img.png"/>
          </mu-card-media>
          <mu-card-title title="文章标题" subTitle="文章简介/描述"/>
          <mu-card-text>{{article.content}}</mu-card-text>
          <mu-card-actions>
            <mu-flat-button label="赞"/>
            <mu-flat-button label="收藏"/>
            <mu-flat-button label="转发"/>
          </mu-card-actions>
        </mu-card>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        articles: {},
      }
    },
    mounted() {
      const self = this;
      self.getIndexData();
    },
    methods: {
      ...mapActions([
        'setUser',
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      getIndexData() {
        const self = this;
        self.$api.get('/api/getArticles', {pagenum: 1, pagesize: 10}, true).then((res) => {
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
    },
  }
</script>

<style lang="scss" scoped>
  .article-card {
    margin-bottom: 1.5rem;
  }
</style>
