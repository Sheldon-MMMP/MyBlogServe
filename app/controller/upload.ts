import { Controller } from 'egg';
import fs from 'fs';
import path from 'path';
import awaitWriteStream from 'await-stream-ready';
import sendToWormhole from 'stream-wormhole';
import dayjs from 'dayjs';

export default class UpLoadController extends Controller {
  // markdown中需要上传图片的接口
  public async upImage() {
    const stream = await this.ctx.getFileStream();
    const uploadBasePath = 'app/public/Image';
    const awaitWriteStreamWrite = awaitWriteStream.write;
    const { ctx } = this;
    const filename = `${Date.now()}${Number.parseInt(`${Math.random() * 1000}`)}${path.extname(stream.filename).toLocaleLowerCase()}`;
    const dirname = dayjs(Date.now()).format('YYYY-MM-DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }

    }
    mkdirsSync(path.join(uploadBasePath, dirname));
    const target = path.join(uploadBasePath, dirname, filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStreamWrite(stream.pipe(writeStream));
    } catch (err: any) {
      await sendToWormhole(stream);
      ctx.throw(err, 500);
    }

    const { origin } = this.ctx.request;
    let url = path.join('/public/Image', dirname, filename).replace(/\\|\//g, '/');
    url = origin + url;
    this.ctx.apiSuccess([{ url, title: filename }]);
  }

  // 创建md文件
  public async createMd() {
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
      type: {
        type: 'string',
        desc: '类型',
        required: true,
        range: {
          // eslint-disable-next-line array-bracket-spacing
          in: ['doc', 'product', 'interview'],
        },
      },
      title: {
        type: 'string',
        desc: '文件名',
        required: true,
        range: {
          max: 1000,
          min: 1,
        },
      },
      content: {
        type: 'string',
        desc: '文档内容',
        required: true,
        range: {
          max: 100000000,
          min: 1,
        },
      },
    });
    const { type, title, content, category } = ctx.request.body;
    const dirPath = path.resolve('app/public/markdown').replace(/\\|\//g, '/');
    const sameName = await app.model.BlogList.findOne({
      where: {
        article_name: title,
      },
    });
    if (sameName) {
      return ctx.apiSuccess('名字已经被占用');
    }
    fs.writeFileSync(dirPath + `/${title}.md`, content);
    const createFile = await app.model.BlogList.create({ type_id: type, article_name: title, category_id: category, md_path: `${title}.md` });
    if (!createFile) {
      return ctx.apiSuccess('创建失败');
    }
    return ctx.apiSuccess('创建成功');
  }
}
