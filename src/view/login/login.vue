<template>
  <section class="login-wrap">
    <div class="login-header">
      <mu-appbar title="">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" to="/"/>
        <!--<mu-flat-button label="欢迎登录" solt="default"/>-->
      </mu-appbar>
    </div>
    <div class="login-content">
      <div class="head">
        <!--<p class="title">登录</p>-->
      </div>
      <div class="form-content">
        <p class="input-wrap">
          <input type="text" placeholder="请输入用户名" class="ipt account" v-model="userInfo.account"
                 @input="accountEvt">
        </p>
        <div class="input-wrap">
          <input :type="pwdType" placeholder="请输入密码" class="ipt pwd" v-model="userInfo.pwd" @input="pwdEvt">
          <p class="showPwd" @click="eyeShow">
            <img src="../../assets/public/eye-close.png" alt="" v-show="!showPassword">
            <img src="../../assets/public/eye-show.png" alt="" v-show="showPassword">
          </p>
        </div>
        <p class="input-wrap">
          <input type="button" value="登录" :disabled="isDisabled" class="ipt login-btn"
                 @click="loginEvt()">
        </p>
        <p class="input-wrap action-account">
          <router-link to="/signup" class="to-signup">没有账号？马上注册</router-link>
          <router-link to="/findPwd" class="ro-find-pwd">忘记密码？</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import utils from '../../common/utils'
  import auth from '../../common/auth'

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
          self.$api.post('/api/user/login', {
            name: username,
            pwd: password,
          }).then((res) => {
            const data = res.data;
            if (!data.code > 0) {
              self.toastOpt.message = data.msg;
              self.showToast(self.toastOpt);
            } else {
              if(data.code === 1){
                let userInfos = {
                  token: data.token,
                  avatar: data.avatar,
                  name: data.result.name,
                  gender: data.gender,
                  birthday: data.birthday
                };
                self.setUser(userInfos); // 存store
                auth.setToken(userInfos.token); // 存本地
                auth.setUserInfo(JSON.stringify(userInfos));
                //登陆后返回上一个页面,根据参数requri
                utils.routerBack(self);
              }else if(data.code === 2){
                self.toastOpt.message = data.msg;
                self.showToast(self.toastOpt);
              }

            }
          }).catch(e => {
            let options = {
              isShow: true,
              message: e.msg || '登录出错,请重试',
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
  @import '../../style/login';

</style>
