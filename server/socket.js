function socket(server) {
  const io = require('socket.io')(server);
  // let hashName = Array();
  /*
   * 不推荐使用全局user数组维护用户, 实现私聊, 用户量过大,会导致遍历数组变慢
   * socket有id属性, 可以通过这个实现点对点通信, 通过io.sockets.sockets获取所有在线的客户端
  */
  io.on('connection', function (socket) {  // 接收socket参数

    socket.on('online', function (data) {
      socket.name = data.name;
    });

    /*
      *  类数组对象,不能直接进行数组遍历,要么for in, 要么先转换数组:
      *   let divList = document.querySelectorAll('div');   //divList不是数组，而是nodeList
      *   1.  [].slice.call(divList).forEach(function(element,index){
                element.classList.add('test')
              })


          2.  Array.prototype.slice.call(divList).forEach(function(element,index){
                element.classList.remove('test')
              })

          3.  [...divList].forEach(function(element,index){   //<strong>ES6写法</strong>
                //do something
              })
      *
      * */

    /*
    *   常规写法, 遍历对象:
    *   for (let client in clients) {
          if (!clients[client]) {
            console.log('用户不在线')
          }
          if (clients[client].name === toName) {
            clients[client].emit('message', data);
          }
        }
    * */
    socket.on('sayTo', function (data, callback) {
      let toName = data.to;
      let clients = io.sockets.sockets; // object
      for (let client of Object.keys(clients)) { // object转为可遍历的, 或者使用for in
        if (clients[client].name === toName) {
          clients[client].emit('message', data);
          callback("已读");
        }
        // else {
        //   socket.emit('outline', {
        //     msg: '用户不在线',
        //     status: 0
        //   });
        // }
      }
    });

    // socket.on('outline', function (obj) {
    //   return
    //   try {
    //     const is = Object.hasOwnProperty.call(users[obj.roomid], obj.name)
    //     if (is) {
    //       delete users[obj.roomid][obj.name]
    //       global.logger.info(obj.name + '退出了' + obj.roomid)
    //       io.to(obj.roomid).emit('logout', users[obj.roomid])
    //       socket.leave(obj.roomid)
    //     }
    //   } catch (e) {
    //     global.logger.error(e)
    //   }
    // })

    // 用户下线
    socket.on('disconnect', function () {
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
