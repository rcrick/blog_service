'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/articleList', controller.default.home.articleList);
  router.get('/default/aticle/:id', controller.default.home.aticle);
  router.get('/default/category', controller.default.home.category);
  router.get('/default/articleListCategory/:id', controller.default.home.articleListCategory);
};
