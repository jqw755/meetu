<template>
  <section class="signup-wrap">
    <div class="signup-header">
      <mu-appbar title="">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" to="/login"/>
        <mu-flat-button label="注册" solt="default"/>
      </mu-appbar>
    </div>
    <div class="signup-content">
      <div class="head">
        <div class="signup-avatar">
          <img :src="userInfo.uploadAvatar" alt="选择头像" class="upload-avatar" v-if="userInfo.uploadAvatar">
          <p class="default-avatar" @click="emitChoose" v-else></p>
            <input type="file" name="avatar" class="avatar" id="avatar" @change="chooseAvatar">
            <input type="submit" class="avatar" id="avatarSubmit">
        </div>
        <!--<p class="title">注册</p>-->
      </div>
      <div class="form-content">
        <p class="input-wrap">
          <input type="text" name="name" placeholder="请输入用户名" class="ipt account" v-model="userInfo.name"
                 @input="accountEvt">
        </p>
        <div class="input-wrap">
          <input :type="pwdType" name="pwd" placeholder="请输入密码" class="ipt pwd" v-model="userInfo.pwd" @input="pwdEvt">
          <p class="showPwd" @click="eyeShow">
            <img src="../../assets/public/eye-close.png" alt="" v-show="!showPassword">
            <img src="../../assets/public/eye-show.png" alt="" v-show="showPassword">
          </p>
        </div>
        <p class="input-wrap">
          <input type="button" value="登录" :disabled="isDisabled" class="ipt signup-btn"
                 @click="signupEvt()">
        </p>
        <p class="input-wrap action-account">
          <router-link to="/login" class="ro-find-pwd">已有账号，直接登录</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        token: null,
        pwdType: 'password',
        isDisabled: true,
        showPassword: false,
        userInfo: {
          uploadAvatar: "",
          name: '',
          pwd: ''
        },
        noticeOptions: {},
        toastOpt: {
          isShow: true,
          message: '',
          time: 3000
        }
      }
    },
    mounted() {
      const self = this;
      //设置title
      self.setTitle('注册^_^');
    },
    methods: {
      ...mapActions([
        'setUser',
        'showNotice',
        'showToast',
        'setTitle',
      ]),
      emitChoose() {
        document.getElementById('avatar').click();
      },
      chooseAvatar(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.userInfo.uploadAvatar = files[0];
      },
      accountEvt() {
        const self = this;
        if (self.userInfo.name.length > 0 && self.userInfo.pwd.length > 0) {
          self.isDisabled = false;
        } else {
          self.isDisabled = true;
        }
      },
      pwdEvt() {
        const self = this;
        if (self.userInfo.name.length > 0 && self.userInfo.pwd.length > 0) {
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
      signupEvt() {
        const self = this;
        if (!self.userInfo.name.length > 0) {
          self.toastOpt.message = '还没有输入名称哦';
          self.showToast(self.toastOpt);
        } else if (!self.userInfo.pwd.length > 0) {
          self.toastOpt.message = '别忘记输入密码';
          self.showToast(self.toastOpt);
        } else {
          document.getElementById('avatarSubmit').click();
          let username = self.userInfo.name,
            pwd = self.userInfo.pwd;
          self.$api.post('/api/user/register', {
            name: username,
            pwd: pwd,
            avatar: ''
          }).then((res) => {
            const data = res.data;
            if (!data.code > 0) {
              self.toastOpt.message = data.msg;
              self.showToast(self.toastOpt);
            } else {
              if (data.code === 1) {
                //注册成功，转去登录
                self.toastOpt.message = data.msg;
                self.showToast(self.toastOpt);
                setTimeout(function () {
                  self.$router.push({
                    path: '/login'
                  })
                }, 1500)
              }
            }
          }).catch(e => {
            let options = {
              isShow: true,
              message: e.msg || '注册出错,请重试',
              noCancel: true,
            };
            self.showNotice(options);
          })
        }
      }
    },
    computed: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '../../style/login';

</style>
