const Article = require('../../db/model/article');
const User = require('../../db/model/user');

const articleCtrl = {
  // 文章列表
  async getArticles(ctx, next) {
    let {n, p} = ctx.request.query;
    let limitObj = {
      limitNum: parseInt(n), // 转换成int
      limitPage: parseInt(p)
    };
    // 第一个 {} 放 where 条件，为空表示返回集合中所有文档。
    // 第二个 {} 指定那些列显示和不显示 （0表示不显示 1表示显示)。
    // MongoDB执行顺序: sort skip limit
    await Article.find({}, {__v: 0, authorId: 0}, (err, data) => {
      if (err) {
        // console.log(err)
        ctx.status = 500;
        ctx.body = {
          msg: '系统错误',
          code: -1
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          mag: '获取文章列表成功',
          result: data,
          code: 1
        };
      }
    }).sort({_id: -1}).limit(limitObj.limitNum);
  },

  // 保存文章
  // 有BUG, 会执行两次保存命令, 这里先暂时解决一下, 因为没发现问题是啥, 后续看具体的
  async saveArticle(ctx, next) {
    let {viewAuth, title, date, content} = ctx.request.body;
    // 拿到由token解析出来的用户信息
    let {id} = ctx.apiUser;
    console.log(1111)
    let authAuthor = await User.findById(id);
    let article = {
      author: authAuthor.name,
      authorId: authAuthor._id,
      avatar: authAuthor.avatar || ' none ',
      viewAuth: viewAuth,
      title: title,
      date: date,
      content: content
    };
    console.log(2222)
    await new Article(article).save(()=>{
      console.log(3333)
    });
    ctx.status = 200;
    ctx.body = {
      mag: '发布成功',
      code: 1
    };
  },

  // 文章详情
  async articleDetail(ctx, next) {
    const _id = ctx.request.query.id;
    await Article.findOne({_id}, {__v: 0}, (err, data) => {
      if (err) {
        ctx.status = 500;
        ctx.body = {msg: '系统错误', code: -1};
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 1,
          mag: '获取文章详情成功',
          result: data
        };
      }
    });
  },

};

module.exports = articleCtrl;
