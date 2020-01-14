'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi';
  }

  async list() {
    const { ctx } = this;
    ctx.body = '<h1>test</h1>';
  }

  async articleList() {
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time," +
              'article.view_count as view_count,' +
              'type.type_name as type_name ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async aticle() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.article_content as article_content,' +
              "FROM_UNIXTIME(article.create_time, '%Y-%m-%d %H:%i:%s') as create_time," +
              'article.view_count as view_count,' +
              'type.type_name as type_name,' +
              'type.id as typeID ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.id = ' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };

  }

  async category() {
    const results = await this.app.mysql.select('type', {
      orders: [[ 'order_num', 'asc' ]],
    });
    this.ctx.body = { data: results };
  }

  async articleListCategory() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.create_time, '%Y-%m-%d') as create_time," +
              'article.view_count as view_count,' +
              'type.type_name as type_name ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.type_id =' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
