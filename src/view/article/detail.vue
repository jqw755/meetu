<template>
  <div class="detail-container">
    <section class="detail-header">
      <mu-appbar title="">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" to="/"/>
        <mu-flat-button label="文章" solt="default"/>
        <mu-icon-menu icon="more_vert" slot="right">
          <mu-menu-item title="举报"/>
        </mu-icon-menu>
      </mu-appbar>
    </section>
    <section class="detail-wrap">
      <div class="">
        <mu-card>
          <mu-card-header :title="articleInfo.username" :subTitle="articleInfo.date">
            <mu-avatar src="../../assets/public/me.png" slot="avatar"/>
          </mu-card-header>
          <mu-card-media v-if="articleInfo.image">
            <img src="/src/assets/public/article-img.png"/>
          </mu-card-media>
          <mu-sub-header v-if="articleInfo.title">{{articleInfo.title}}</mu-sub-header>
          <mu-content-block>{{articleInfo.content}}</mu-content-block>
          <mu-card-actions>
            <mu-checkbox uncheckIcon="favorite_border" checkedIcon="favorite"/>
            <mu-checkbox uncheckIcon="star_border" checkedIcon="star" color="red"/>
            <!--<mu-icon-button icon="star_border"/>-->
            <mu-icon-button icon="share"/>
          </mu-card-actions>
        </mu-card>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        toastOpt: {
          isShow: true,
          message: ''
        },
        articleInfo: {},
      }
    },
    mounted() {
      const self = this;
      self.setTitle('文章详情');
      self.getDetailData();
    },
    methods: {
      ...mapActions([
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      getDetailData() {
        const self = this;
        let articleId = self.$route.params.id;
        self.$api.get('/api/article/articleDetail', {'id': articleId}, true).then((res) => {
          const data = res.data;
          // 所有code<0的操作,在axios.js中的检查状态码中都已经定义了, 日后更改这个一部分
          if (!data.code > 0) {
            self.toastOpt.message = data.msg;
            self.showToast(self.toastOpt);
          } else {
            if (data.code === 1) {
              this.articleInfo = data.result;
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

</style>
