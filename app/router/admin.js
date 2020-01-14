'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminAuth();

  router.get('/admin/index', adminAuth, controller.admin.admin.index);
  router.get('/admin/deleteArticle/:id', adminAuth, controller.admin.admin.deleteArticle);
  router.get('/admin/getArticleById/:id', adminAuth, controller.admin.admin.getArticleById);
  router.get('/admin/category', adminAuth, controller.admin.admin.category);
  router.get('/admin/articleList', adminAuth, controller.admin.admin.articleList);
  router.post('/admin/checkLogin', controller.admin.admin.checkLogin);
  router.post('/admin/addArticle', adminAuth, controller.admin.admin.addArticle);
  router.post('/admin/updateArticle', adminAuth, controller.admin.admin.updateArticle);
};
