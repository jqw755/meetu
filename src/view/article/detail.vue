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
        <mu-sub-header>阳光</mu-sub-header>
        <mu-content-block>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-content-block>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        articleInfo: {},
      }
    },
    mounted() {
      const self = this;
      // self.getDetailData();
      self.setTitle('文章详情');
    },
    methods: {
      ...mapActions([
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      getDetailData() {
        const self = this;
        self.$api.get('/api/getArticle', {}, true).then((res) => {
          const data = res.data;
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
