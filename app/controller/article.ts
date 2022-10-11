import { Controller } from 'egg';
// const fs = require('fs');

export default class ArticleController extends Controller {
  public async getArticle() {
    const { ctx, app } = this;
    ctx.validate({
      category: {
        type: 'string',
        desc: '类型',
        required: true,
        range: {
          in: ['html', 'css', 'js', 'vue', 'react', 'http'],
        },
      },
      id: {
        type: 'number', desc: '文章号', required: true, range: {
          min: 1,
          max: Infinity,
        },
      },
    });
    const { category, id } = ctx.request.body;
    const find = await app.model.blogList.findOne({ where: { category_id: category, article_id: id } });

    if (find) {
      ctx.throw(400, '文章不存在');
    }
    console.log(find);
    ctx.apiSucces();
  }
}
