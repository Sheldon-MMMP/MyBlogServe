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
          // eslint-disable-next-line array-bracket-spacing
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
    // eslint-disable-next-line array-bracket-spacing
    const [category, id] = ctx.captures;
    const find = await app.model.BlogList.findOne({ where: { category_id: category, article_id: id } });

    if (!find) {
      ctx.throw(400, '文章不存在');
    }

    ctx.apiSuccess({
      articleId: find.article_id,
      articleName: find.article_name,
      category: find.article_id,
      type: find.type_id,
      path: find.md_path,
      createAt: find.created_at,
      updatedAt: find.updated_at,
    });
  }
}
