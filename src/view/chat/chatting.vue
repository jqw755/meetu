<template>
  <section class="chatting-wrap">
    <!--对话内容-->
    <div class="dialogue-wrap clear-fix">
      <p :class="['dialogue-item', 'clear-fix', {'my-self': dialogObj.me===item.form}]"
         v-for="(item, index) in dialogObj.dialogMsg">
        <span class="dialog-user">{{item.form}}</span>
        <span class="dialog-content">{{item.msg}}</span>
      </p>
    </div>

    <!--输入区-->
    <div class="msg-action">
      <div class="action-wrap clear-fix">
        <mu-text-field v-model="dialogObj.sendMsg" class="msg-input"/>
        <mu-icon-button icon="face" @click="selectEmoji" class="msg-btn"/>
        <mu-icon-button icon="add" @click="selectFile" class="msg-btn" v-show="!dialogObj.sendMsg"/>
        <mu-icon-button icon="send" @click="sendAction" class="msg-btn" v-show="dialogObj.sendMsg"/>
      </div>
    </div>
  </section>
</template>


<script>
  import auth from '../../common/auth'
  import utils from '../../common/utils'

  export default {
    data() {
      return {
        bottomNav: 'message',
        dialogObj: {  // 聊天大对象
          me: '', // 自己
          to: '', // 要聊天的用户
          isOnLine: false,
          sendMsg: '',
          dialogMsg: [],
          socket: {},
        },

      }
    },
    mounted() {
      const self = this;
      let me = self.dialogObj.me = JSON.parse(auth.getUserInfo()).name;
      self.dialogObj.to = utils.getQuery('id');
      let socket = io.connect('http://localhost:3000');
      self.dialogObj.socket = socket;
      // 在线
      socket.emit('online', {
        name: me
      });
      // 收到消息
      socket.on('message', function (data) {
        self.dialogObj.dialogMsg.push(data);
        self.dialogObj.isOnLine = true;
      });
      // 离线
      socket.on('outline', function (data) {
        console.log(data);
        self.dialogObj.isOnLine = false;
      })
    },
    methods: {
      // 发送消息
      sendAction() {
        const self = this;
        if (!self.dialogObj.sendMsg) {
          return;
        }
        let sendDialog = {
          msg: self.dialogObj.sendMsg,
          form: self.dialogObj.me,
          to: self.dialogObj.to
        };
        self.dialogObj.dialogMsg.push(sendDialog);
        self.dialogObj.sendMsg = '';
        self.dialogObj.socket.emit('sayTo', sendDialog, (data) => {
          console.log(data)
        });
        // DOM更新后执行的延迟回调 Vue.$nextTick()
        this.$nextTick(() => {
          document.body.scrollTop = document.querySelector('.dialogue-wrap').scrollHeight;
        })
      },
      selectEmoji() {
      },
      selectFile() {
      },

    },
    updated() {

    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/chat/chat.scss";
</style>
