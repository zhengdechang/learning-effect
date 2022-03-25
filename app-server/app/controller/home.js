'use strict';

const Controller = require('egg').Controller;
const config = require('../assets/config.json');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async getConfig() {
    const { ctx } = this;
    ctx.body = config;
  }
}

module.exports = HomeController;
