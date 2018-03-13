<template>
  <section class="login_wrap">
    <div class="login_content">
      <div class="head">
        <p class="login_default">
          <router-link to="/">
            <!--<img src="../image/public/logo_default.png" alt="">-->
          </router-link>
        </p>
        <p class="title">登录</p>
      </div>
      <div class="form_content">
        <p class="input_wrap">
          <input type="text" placeholder="请输入您注册的邮箱或手机号" class="ipt account" v-model="userInfo.account"
                 @input="accountEvt">
        </p>
        <div class="input_wrap">
          <input :type="pwdType" placeholder="请输入密码" class="ipt pwd" v-model="userInfo.pwd" @input="pwdEvt">
          <p class="showPwd" @click="eyeShow">
            <img src="../assets/public/eye_close.png" alt="" v-show="!showPassword">
            <img src="../assets/public/eye_show.png" alt="" v-show="showPassword">
          </p>
        </div>
        <p class="input_wrap">
          <input type="button" value="登录" :disabled="isDisabled" class="ipt login_btn"
                 @click="loginEvt()">
          <!--showToast(toastOpt)-->
          <!--showNotice(noticeOptions)-->
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import utils from '../common/utils'
  import auth from '../common/auth'

  export default {
    data() {
      return {
        token: null,
        pwdType: 'password',
        isDisabled: true,
        showPassword: false,
        userInfo: {
          account: '',
          pwd: ''
        },
        noticeOptions: {},
        toastOpt: {
          isShow: true,
          message: ''
        }
      }
    },
    mounted() {
      const self = this;
      //设置title
      self.setTitle('登录^_^');
//            self.TOKEN = self.getToken;
    },
    methods: {
      ...mapActions([
        'setUser',
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      accountEvt() {
        const self = this;
        if (self.userInfo.account.length > 0 && self.userInfo.pwd.length > 0) {
          self.isDisabled = false;
        } else {
          self.isDisabled = true;
        }
      },
      pwdEvt() {
        const self = this;
        if (self.userInfo.account.length > 0 && self.userInfo.pwd.length > 0) {
          self.isDisabled = false;
        } else {
          self.isDisabled = true;
        }
      },
      eyeShow() {
        const self = this;
        if (self.showPassword) {
          self.pwdType = 'password';
          self.showPassword = false;
          return;
        }
        self.pwdType = 'text';
        self.showPassword = true;
      },
      loginEvt() {
        const self = this;
        if (!self.userInfo.account.length > 0) {
          self.toastOpt.message = '请输入账号';
          self.showToast(self.toastOpt);
        } else if (!self.userInfo.pwd.length > 0) {
          self.toastOpt.message = '请输入密码';
          self.showToast(self.toastOpt);
        } else {
          let username = self.userInfo.account,
            password = self.userInfo.pwd;
          self.$api.post('/api/signup', {
            name: username,
            pwd: password,
          }).then((res) => {
            const data = res.data;
            if (!data.code > 0) {
              self.toastOpt.message = data.msg;
              self.showToast(self.toastOpt);
            } else {
//              let userInfos = {
//                token: data.token,
//                nickname: data.nickname,
//                avatar: data.avatar,
//                uid: data.uid,
//                userType: data.userType,
//                nickName: data.nickName,
//                email: data.email,
//                gender: data.gender,
//                birthday: data.birthday,
//                address: data.address,
//                intro: data.intro,
//                isAnchor: data.isAnchor,
//                mobile: data.mobile,
//                mobileNumber: data.mobileNumber,
//                emailAccount: data.emailAccount,
//                userName: data.userName
//              };
//              self.setUser(userInfos); // 存store
//              auth.setToken('TOKEN', userInfos.token); // 存本地
//              auth.setUserInfo('USERINFO', JSON.stringify(userInfos));
//              //登陆后返回上一个页面,根据参数requri
//              utils.routerBack(self);
            }
          }).catch(e => {
            let options = {
              isShow: true,
              message: e.msg || '数据获取出错,请重试',
              noCancel: true,
            };
            self.showNotice(options);
          })
        }
      }
    },
    computed: {
//            ...mapGetters(['getToken'])
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '../style/login';

</style>
