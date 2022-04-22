'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const NodeRSA = require('node-rsa');
const md5 = require('md5');
const config = require('../assets/config.json');
const routes = require('../assets/routes.json');

const _ = require('lodash');

class UserController extends Controller {
  async getPublicKey() {
    const { ctx } = this;
    let publicKey;
    try {
      publicKey = fs.readFileSync(path.resolve(__dirname, '../assets/rsa_1024_pub.pem'), 'utf-8');
    } catch (error) {
      ctx.throw(500, '获取公钥失败');
    }
    ctx.body = publicKey;
  }

  async login() {
    const { ctx, app } = this;


    let user;
    try {
      let privateKey = fs.readFileSync(path.resolve(__dirname, '../assets/rsa_1024_priv.pem'), 'utf-8');
      const nodersa = new NodeRSA(privateKey);
      nodersa.setOptions({ encryptionScheme: 'pkcs1' });

      let { phone, pwd } = ctx.request.body;
      pwd = nodersa.decrypt(pwd, 'utf-8');
      user = await ctx.model.User.findOne({ phone, pwd });
    } catch (error) {
      ctx.throw(500, '用户信息校验失败');
    }

    if (!user) {
      ctx.throw(401, '用户名或密码错误');
    }

    const userinfo = {
      _id: user?._id,
      phone: user?.phone,
      name: user?.name,
      user_type: user?.user_type,
      created_at: user?.created_at,
      classes_id: user?.classes_id,
    };

    const token = app.jwt.sign({
      ...userinfo
    }, app.config.jwt.secret, { expiresIn: '86400s' });


    let router = [...routes?.common];

    // 路由权限
    if (userinfo?.user_type === config?.user_type?.super) {
      // 超管
      router = _.flatten(_.map(routes, (item) => item));
    } else if (userinfo?.user_type === config?.user_type?.teacher) {
      // 教师
      router = [...router, ...routes?.teacher];
    } else if (userinfo?.user_type === config?.user_type?.student) {
      // 学生
      router = [...router, ...routes?.student];
    }

    ctx.body = {
      token,
      config,
      user: userinfo,
      routes: [...router],
    };
  }
}

module.exports = UserController;
