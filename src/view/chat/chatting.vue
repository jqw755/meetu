<template>
  <section>
    <!--对话内容-->
      <div class="dialogue-wrap">
        <p class="dialogue-item" v-for="(item, index) in dialogMsgObj">
         <span> {{item.msg}}</span>
         <span></span>
        </p>
      </div>

    <!--输入区-->
    <div class="input-action">
      <mu-text-field v-model="dialogMsg"/>
      <mu-icon-button icon="send" @click="sendMsg"/>
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
        me: '', // 自己
        to: '', // 要聊天的用户
        dialogMsg: '',
        dialogMsgObj: [],
        socket: {},
      }
    },
    mounted() {
      const self = this;
      let me = self.me = JSON.parse(auth.getUserInfo()).name;
      self.to = utils.getQuery('id');
      let socket = io.connect('http://localhost:3000');
      self.socket = socket;
      socket.emit('join', {
        name: me
      });
      socket.on('message',function (data) {
        self.dialogMsgObj.push(data)
      });
    },
    methods: {
      sendMsg() {
        const self = this;
        let sendDialog = {
          msg: self.dialogMsg,
          form: self.me,
          to: self.to
        };
        self.socket.emit('sayTo',sendDialog, (data) => {
          console.log(data)
        });
        self.dialogMsgObj.push(sendDialog)
      },
    },
    components: {

    }
  }
</script>

<style scoped>

</style>
