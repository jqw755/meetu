function socket(server) {
  const io = require('socket.io')(server);
  const _ = require('underscore'); // nodejs扩展
  var hashName = new Array();
  /*
   * 不推荐使用全局user数组维护用户, 实现私聊, 用户量过大,会导致遍历数组变慢
   * socket有id属性, 可以通过这个实现点对点通信
  */
  io.on('connection', function (socket) {  // 接收socket参数

    socket.on('join', function (data) {
      var name = data;
      hashName[name] = socket.id;
    });

    socket.on('sayTo',function (data) {
      var toName = data.to;
      var toId;
      if(toId = hashName[toName]){
        var toSocket = _.findWhere(io.sockets.sockets,{id:toId});
        toSocket.emit('message',data.msg);
        console.log(4)
      }
    })

    socket.on('quit', function (obj) {
      return
      try {
        const is = Object.hasOwnProperty.call(users[obj.roomid], obj.name)
        if (is) {
          delete users[obj.roomid][obj.name]
          global.logger.info(obj.name + '退出了' + obj.roomid)
          io.to(obj.roomid).emit('logout', users[obj.roomid])
          socket.leave(obj.roomid)
        }
      } catch (e) {
        global.logger.error(e)
      }
    })

    // 用户下线
    socket.on('disconnect', function () {
      console.log(socket.id);
      return
      if (users[socket.room] && users[socket.room].hasOwnProperty(socket.name)) {
        delete users[socket.room][socket.name]
        // 用户监听用退出聊天室
        global.logger.info(socket.name + '退出了' + socket.room)
        socket.leave(socket.roomid)
        io.to(socket.room).emit('logout', users[socket.room])
      }
    })
  })
}

module.exports = socket;
