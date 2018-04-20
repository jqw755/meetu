<template>
  <section class="customer-container">
    <div class="customer-wrap">
      <!--header-->
      <div :class="['avatar', {'scrollActive':avatarScrollActive}]">
        <div class="setting">设置</div>
        <div class="avatar-bg">
          <img src="../../assets/public/me.png" alt="">
        </div>
        <div class="avatar-img">
          <img src="../../assets/public/me.png" alt="">
          <p class="signature">{{personalInfo.name}}</p>
        </div>
      </div>

      <div class="movements">
        <div class="movements_wrap">
          <div class="timeLine"></div>
          <router-link :to='`/detail/${item._id}`' v-for="(item, index) in personalInfo.movements" :key="index">
            <div class="item">
              <div class="top">
                <p v-if="0" v-for="img in item.images" class="article_wrap">
                  <img :src="img.src" alt="">
                </p>
                <!--<p class="title">{{item.title}}</p>-->
                <p class="content">{{item.content}}</p>
              </div>
              <div class="date">{{item.date}}</div>
            </div>
          </router-link>
        </div>
      </div>

    </div>

    <!--footer-->
    <globalFooter :changeBottomNav="bottomNav"></globalFooter>
  </section>
</template>

<script>
  import {mapActions} from 'vuex'
  import utils from '../../common/utils'
  import auth from '../../common/auth'
  import globalFooter from '../layout/footer'

  export default {
    data() {
      return {
        toastOpt: {
          isShow: false,
          message: ''
        },
        bottomNav: 'person',
        avatarScrollActive: false,
        // 个人动态
        personalInfo: {
          name: '',
          movements: [],
          comments: [],
        },
      }
    },
    mounted() {
      const self = this;
      self.personalInfo.name = JSON.parse(auth.getUserInfo()).name;
      self.setTitle(self.personalInfo.name);
      // 获取数据
      self.getPersonalData();
      // 监听滚动
      document.body.addEventListener('scroll', self.handleScroll);
    },
    methods: {
      ...mapActions(['showNotice', 'showToast', 'setTitle']),
      getPersonalData() {
        const self = this;
        self.$api.get('/api/user/getUser', {}, true).then((res) => {
          if (res.data.code !== 1) {
            self.toastOpt.message = res.msg;
            self.showToast(self.toastOpt);
          } else {
            self.personalInfo.movements = res.data.result;
          }
        }).catch(e => {
          console.log(e)
          let options = {
            isShow: true,
            message: e.msg || '数据获取出错,请稍后重试',
            noCancel: true,
          };
          self.showNotice(options);
        })
      },
      handleScroll() {
        const self = this;
        // 页面滚动, 设置头部样式
        let bScrollTop = document.body.scrollTop;
        if (bScrollTop >= 165) self.avatarScrollActive = true;
        else self.avatarScrollActive = false;
      },

    },
    components: {
      globalFooter
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/customer";
</style>
