import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/article/content/:category/:id', controller.article.getArticle);
  router.get('/article/directory/:category/:type', controller.article.getDirectory);
};
