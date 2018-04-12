const Article = require('../../db/model/article');

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
    await Article.find({}, {__v: 0}, (err, data) => {
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
    await next();
  },

  // 保存文章
  async saveArticle(ctx, next) {
    let {id, author, viewAuth, title, date, content} = ctx.request.body;
    let article = {
      id: id || '',
      author: author,
      viewAuth: viewAuth,
      title: title,
      // date: (new Date()).getTime(),
      date: date,
      content: content
    };
    let tipMsg = '',
      datas = '';
    if (article.id) {
      //更新文章
      await Article.findByIdAndUpdate(article.id, article, (err, data) => {
        tipMsg = '更新成功';
        datas = data;
      });
    } else {
      //新建文章
      await new Article(article).save((err, data) => {
        tipMsg = '发布成功';
        datas = data;
      });
    }
    ctx.status = 200;
    ctx.body = {
      mag: tipMsg,
      code: 1,
      result: datas
    };
    await next();
  },

  // 文章详情
  async articleDetail(ctx, next) {
    const _id = ctx.request.query.id;
    await Article.findOne({_id}, {__v: 0}, (err, data) => {
      if (err) {
        ctx.status = 500;
        ctx.body = {msg: '系统错误', code: -1};
      }else{
        ctx.status = 200;
        ctx.body = {
          code: 1,
          mag: '获取文章详情成功',
          result: data
        };
      }
    });
    await next();
  },

};

module.exports = articleCtrl;
