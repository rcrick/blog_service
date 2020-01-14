'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'admin';
  }

  async checkLogin() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const result = await this.app.mysql.select('admin_user', {
      where: { userName, password },
    });
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: 'Login Success', openId };
    } else {
      ctx.body = { data: 'Login failed' };
    }
  }

  async category() {
    const results = await this.app.mysql.select('type', {
      orders: [[ 'order_num', 'asc' ]],
    });
    this.ctx.body = { data: results };
  }

  async addArticle() {
    const article = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', article);
    this.ctx.body = {
      success: result.affectedRows === 1,
      insertId: result.insertId,
    };
  }
  async updateArticle() {
    const article = this.ctx.request.body;
    const result = await this.app.mysql.update('article', article);
    this.ctx.body = {
      success: result.affectedRows === 1,
    };
  }

  async articleList() {
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time," +
              'article.view_count as view_count,' +
              'type.type_name as type_name ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id order by id desc';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async deleteArticle() {
    const articleId = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id: articleId });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
    const articleId = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.create_time, '%Y-%m-%d') as create_time," +
    'article.view_count as view_count,' +
    'article.article_content as article_content,' +
    'type.type_name as type_name,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id = ' + articleId;
    console.log(sql);
    const res = await this.app.mysql.query(sql);
    this.ctx.body = { data: res };
  }
}

module.exports = AdminController;
