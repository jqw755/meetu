<template>
  <section class="send-container">
    <div class="send-header">
      <mu-appbar title="">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" to="/"/>
        <mu-flat-button label="发布" slot="right" @click="sendArticle"/>
      </mu-appbar>
    </div>
    <div class="send-from">
      <div class="from-item">
        <mu-text-field fullWidth hintText="标题（选填）" v-model="article.title" :errorText="inputErrorText"
                       @textOverflow="handleInputOverflow"
                       :maxLength="100"/>
        <mu-text-field fullWidth hintText="记录这一刻..." v-model="article.content" :errorText="multiLineInputErrorText"
                       @textOverflow="handleMultiLineOverflow"
                       multiLine :rows="10" :maxLength="500" required/>
      </div>
      <div class="from-item">
        <mu-select-field v-model="viewAuth" label="谁可以看">
          <mu-menu-item value="1" title="所有人可见"/>
          <mu-menu-item value="2" title="好友可见"/>
          <mu-menu-item value="3" title="自己可见"/>
        </mu-select-field>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions} from 'vuex'
  import utils from '../../common/utils'

  export default {
    data() {
      return {
        inputErrorText: '',
        multiLineInput: '',
        multiLineInputErrorText: '',
        viewAuth: '1',
        toastOpt: {
          isShow: true,
          message: ''
        },
        article: {
          title: '',
          content: ''
        }

      }
    },
    mounted() {
      const self = this;
      self.setTitle('记录中...');
    },
    methods: {
      handleInputOverflow(isOverflow) {
        this.inputErrorText = isOverflow ? '标题最多输入100字' : ''
      },
      handleMultiLineOverflow(isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '内容最多输入500字' : ''
      },
      ...mapActions([
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      sendArticle() {
        const self = this;
        let article = {
          viewAuth: self.viewAuth,
          title: self.article.title,
          content: self.article.content,
          date: utils.formatDate(new Date(), 'yyyy-MM-dd hh:mm')
        };
        if (!article.content) {
          self.toastOpt.message = '请填写内容';
          self.showToast(self.toastOpt);
        } else {
          self.$api.post('/api/article/saveArticle', {...article}).then((res) => {
            const data = res.data;
            if (data.code !== 1) {
              self.toastOpt.message = data.msg;
              self.showToast(self.toastOpt);
            } else {
              this.$router.push({
                path: '/index'
              })
            }
          }).catch(e => {
            let options = {
              isShow: true,
              message: e.msg || '请求出错,请重试',
              noCancel: true,
            };
            self.showNotice(options);
          })
        }
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .send-container {
    .send-from {
      padding: 1rem 2rem 0 2rem;
    }
  }

</style>
