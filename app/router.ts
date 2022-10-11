import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/article/:category/:id', controller.article.getArticle);
};
