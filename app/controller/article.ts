import { Controller } from 'egg';
import fs from 'fs';
import path from 'path';

export default class ArticleController extends Controller {
  // 获取文章
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
    const { category, id } = ctx.params;
    const find = await app.model.BlogList.findOne({ where: { category_id: category, article_id: id } });
    if (!find) {
      ctx.throw(400, '文章不存在');
    }
    const mdPath = fs.readFileSync(path.join('app/public', find.md_path).replace(/\\|\//g, '/')).toString();
    ctx.apiSuccess({
      articleId: find.article_id,
      articleName: find.article_name,
      category: find.article_id,
      type: find.type_id,
      path: mdPath,
      createAt: find.created_at,
      updatedAt: find.updated_at,
    });
  }

  // 获取文章目录
  public async getDirectory() {
    const { app, ctx } = this;
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
      type: {
        type: 'string',
        desc: '类型',
        required: true,
        range: {
          // eslint-disable-next-line array-bracket-spacing
          in: ['doc', 'product', 'interview'],
        },
      },
    });
    // eslint-disable-next-line array-bracket-spacing
    const { category, type } = ctx.params;
    let find = await app.model.BlogList.findAll({
      where: {
        category_id: category,
        type_id: type,
      },
    });
    find = JSON.parse(JSON.stringify(find));
    ctx.apiSuccess(find);
  }
}
